from rest_framework import serializers
from account.models import User
from account.models import Report

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    

    class Meta:
        model = User
        fields = ["email", "name", "password"]

    def validate(self, attrs):
        password = attrs.get('password')
        name = attrs.get('name')
        if len(password) < 6:
            raise serializers.ValidationError("Password must be greater than 5 letters.")

        # Name validation
        if any(char in name for char in ('@', '.', '-', '+','1','2','3','4','5','6','6','7','8','9','0')):
            raise serializers.ValidationError({'name':"Symbols @/./-/+ and Numbers are not allowed in Name."})
        return attrs

        
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
          raise serializers.ValidationError('user with this Email already exists.')
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
        )
        user.is_active = False
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class UserLoginSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["email","password"]



class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'name']


class UserReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = ['user','title','bug_code','bug_report']

    # def create(self, data):
    #     report = Report.objects.create(
    #         userid_id='userid_id',
    #         bug_code='bug_code',
    #         bug_report='bug_report'
            
    #     )
        
    #     report.save()
    #     return report



    