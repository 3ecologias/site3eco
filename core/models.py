from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from django import forms
from django.core.exceptions import ValidationError
from ckeditor.fields import RichTextField


from django.db import models

class Post(models.Model):
	"""Model for a post"""
	title = models.CharField(max_length=250)
	date = models.DateTimeField()
	text = RichTextField()
	thumb = models.ImageField(upload_to='thumbs/%Y/%m/%d/', null=True, blank=False)

	def publish(self):
		self.published_date = timezone.now()
		self.save()

	def __unicode__(self):
		return self.title


class ContactForm(forms.Form):
    name = forms.CharField(
    	required=True,
    	widget=forms.TextInput(
    		attrs={'placeholder': 'Nome *', 'id': 'name', 'class': 'form-control input-lg', 'type': 'text'}))

    email_contact = forms.EmailField(required=True,
    	widget=forms.EmailInput(
    		attrs={'placeholder': 'Email *', 'id': 'email', 'class': 'form-control'}))

    phone = forms.CharField(max_length=15,
    	widget=forms.TextInput(
    		attrs={'placeholder': 'Telefone *', 'id': 'phone', 'class': 'form-control'
    		, 'maxlength': '15'}))

    content = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={'placeholder': 'Mensagem *', 'id': 'message', 'class': 'form-control'})
    )
		
class Portfolio(models.Model):
	"""Model for Portfolio"""

	# Miniature #
	miniature_title = models.CharField(max_length=1000, blank=True)
	category = models.CharField(max_length=1000, blank=True)
	miniature_image = models.ImageField(upload_to='portfolio/miniatures/%Y/%m/%d', null=True, blank=True)

	#Full Product #

	project_name = models.CharField(max_length=1000, blank=True)
	intro = models.CharField(max_length=1000, blank=True)
	image = models.ImageField(upload_to='portfolio/images/%Y/%m/%d', null=True, blank=True)
	description = RichTextField(blank=True)
	date = models.DateField(null=True, blank=True)
	client = models.CharField(max_length=1000, blank=True)

	def __unicode__(self):
		return self.project_name

