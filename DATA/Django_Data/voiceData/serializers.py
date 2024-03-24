from rest_framework import serializers
from .models import SoundFeature


<<<<<<< HEAD
class SoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoundFeature
        fields = '__all__'
=======
class SoundFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoundFeature
        fields = '__all__'
>>>>>>> 75e364b878e58d351f3ac3a7cc305b36d6509cdb
