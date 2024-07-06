from django.contrib.auth import authenticate, login, logout
from account.models import User
from account.models import Report
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from account.serializers import UserSerializer
from account.serializers import UserLoginSerializer
from account.serializers import UserProfileSerializer
from account.serializers import UserReportSerializer
from django.http import HttpResponse  
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.conf import settings
from account.utils import send_activation_email
from django.template.loader import render_to_string
from django.http import JsonResponse
from django.middleware.csrf import get_token



# custom
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({'success':'CSRF Cookie Set'})

# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

# @method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    permission_classes=[AllowAny]
    def get(self, request):
        if request.user.is_authenticated:
            return Response({'isAuthenticated': True})
        else:
            return Response({'isAuthenticated': False})
 
# @method_decorator(csrf_protect, name='dispatch')
class RegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)

            # Send Acctount Activation EMail
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            token2 = get_tokens_for_user(user)
            activation_link = reverse('activate', kwargs={'uid':uid, 'token':token})
            activation_url = f'{settings.SITE_DOMAIN}{activation_link}'
            send_activation_email(user.email, activation_url,uid,token)
            
            return Response({'token2':token2,'data':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @method_decorator(csrf_protect, name='dispatch')
class ActivateView(APIView):
    permission_classes = [AllowAny]
    def get(self,request,uid,token):
        print(uid)
        print(token)
        if not uid or not token:
            return Response({'detail': 'Missing uid or token.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                if user.is_active:
                   
                    
                    # return render(request, 'success_message.html', {'message': 'Account is already activated'})
                    return Response({'detail': 'Account is already activated.'}, status=status.HTTP_200_OK)
                    # render_to_string('account/success_message.html', {'message': 'Account is already activated'})
 
                user.is_active = True
                user.save()
                
                return Response({'detail': 'Account activated successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid activation link.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid activation link.'}, status=status.HTTP_400_BAD_REQUEST)
        


# @method_decorator(csrf_protect, name='dispatch')
class ActivationConfirm(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        if not uid or not token:
            return Response({'detail': 'Missing uid or token.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                if user.is_active:
                    return Response({'detail': 'Account is already activated.'}, status=status.HTTP_200_OK)
 
                user.is_active = True
                user.save()
                return Response({'detail': 'Account activated successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid activation link.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid activation link.'}, status=status.HTTP_400_BAD_REQUEST)
        

# @method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]

    


    def post(self, request):
        serializer = UserLoginSerializer(data = request.data)
        email = request.data.get('email')
        password = request.data.get('password')

        if (email == "" or password == ""):
            return Response({'detail': 'Email and Password is required.'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            user = authenticate(request,email=email, password=password)
            print(user)
     
            if user is not None:
                if user.is_active:
                    login(request, user)
                    token2 = get_tokens_for_user(user)
                    # session_key = request.session.session_key
                    # print(session_key)
                    # print(token2)
                    
                    return Response({'detail':'Logged in successfully.','token2':token2 },status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Please Activate Your Account.'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'detail': 'Email or Password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)


    
        
class UserDetailView(APIView):
  
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    def post(self,request):
        logout(request)
        return Response({'detail':'Logged Out Successfully'},status.HTTP_200_OK)


class ReportView(APIView):
    permission_classes = [AllowAny]

    def get(self,request):
        
        report = Report.objects.filter(user=request.user)
        serializer = UserReportSerializer(report, many=True)
        return Response({'data':serializer.data}, status=status.HTTP_200_OK)
    

    def post(self, request):
        serializer = UserReportSerializer(data = request.data)
        bug_code = request.data.get('bug_code')
        title = request.data.get('title')
        if serializer.is_valid():
            if Report.objects.filter(bug_code=bug_code).exists():
                return Response({'error':'Chat Already Exist'}, status=status.HTTP_400_BAD_REQUEST)
                
            else:
                report = serializer.save()
                return Response({'data':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ChangePasswordView(APIView):
#     def post(self, request):
#         old_password = request.data.get('old_password')
#         new_password = request.data.get('new_password')
#         user = request.user

#         if not user.check_password(old_password):
#             return Response({'detail': 'Invalid old password.'}, status=status.HTTP_400_BAD_REQUEST)

#         user.set_password(new_password)
#         user.save()
#         return Response({'detail': 'Password changed successfully.'}, status=status.HTTP_200_OK)
    

    
# # @method_decorator(csrf_protect, name='dispatch')
# class ResetPasswordEmailView(APIView):
    # permission_classes=[AllowAny]
    # def post(self, request):
    #     email = request.data.get('email')

    #     if not User.objects.filter(email=email).exists():
    #         return Response({'detail': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

    #     user = User.objects.get(email=email)

    #     # Generate password reset token
    #     uid = urlsafe_base64_encode(force_bytes(user.pk))
    #     token = default_token_generator.make_token(user)
    #     reset_link = reverse('reset_password', kwargs={'uid': uid, 'token': token})
    #     # print("Reset Link", reset_link)
    #     reset_url = f'{settings.SITE_DOMAIN}{reset_link}'
    #     # print("Reset URL", reset_url)
    #     send_reset_password_email(user.email, reset_url)

    #     return Response({'detail': 'Password reset email sent successfully.'}, status=status.HTTP_200_OK)
    
# @method_decorator(csrf_protect, name='dispatch')
# class ResetPasswordView(APIView):
#     permission_classes = [AllowAny]

# # @method_decorator(csrf_protect, name='dispatch')
# class ResetPasswordConfirmView(APIView):
#     permission_classes=[AllowAny]
#     def post(self, request):
#         uid = request.data.get('uid')
#         token = request.data.get('token')
#         if not uid or not token:
#             return Response({'detail': 'Missing uid or token.'}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             uid = force_str(urlsafe_base64_decode(uid))
#             user = User.objects.get(pk=uid)
#             if default_token_generator.check_token(user, token):
#                 new_password = request.data.get('new_password')

#                 if not new_password:
#                     return Response({'detail': 'New password is required.'}, status=status.HTTP_400_BAD_REQUEST)

#                 user.set_password(new_password)
#                 user.save()
#                 return Response({'detail': 'Password reset successful.'}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'detail': 'Invalid reset password link.'}, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist:
#             return Response({'detail': 'Invalid reset password link.'}, status=status.HTTP_400_BAD_REQUEST)
