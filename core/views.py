#-*- coding: utf-8 -*-
from django.shortcuts import render
from django.utils import timezone
from .models import Post
from .models import Portfolio
from .models import ContactForm
from django.contrib import messages
from django.template.loader import get_template
from django.core.mail import EmailMessage
from django.template import Context
from django.http import HttpResponseRedirect, Http404, HttpResponse
import json
from django.db.models import Count
from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers

from django.conf import settings
import urllib
import urllib2
import json




def fullsite(request):
	context_general = {}

	## Posts ##

	context_general["posts"] = Post.objects.order_by('-date')[:3]

	## Form ##

	form_class = ContactForm

	if request.method == 'POST':
		form = form_class(data=request.POST)

		if form.is_valid():

			name = request.POST.get('name', '')

			email_contact = request.POST.get('email_contact', '')

			phone = request.POST.get('phone', '')

			content = request.POST.get('content', '')

            # Email the profile with the
            # contact information
			template = get_template('core/email_template.txt')

			context_email = Context({
				'name': name,
				'email_contact': email_contact,
				'phone': phone,
				'content': content,
			})
			content = template.render(context_email)

			# console send ##

			email = EmailMessage(
				"Novo contato",
				content,
				email_contact,
				['admin@3ecologias.net']
 			)

			''' Begin reCAPTCHA validation '''
			recaptcha_response = request.POST.get('g-recaptcha-response')
			url = 'https://www.google.com/recaptcha/api/siteverify'
			values = {
				'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
				'response': recaptcha_response
	        }
			data = urllib.urlencode(values)
			req = urllib2.Request(url, data)
			response = urllib2.urlopen(req)
			result = json.load(response)
			''' End reCAPTCHA validation '''
			if result['success']:
				email.send()
				messages.success(request, 'Seu contato foi enviado com sucesso!')
			else:
				messages.error(request, 'reCAPTCHA inválida. Por favor, tente novamente.')
			return HttpResponseRedirect('/')


	context_general["form"] = form_class

	context_general["ports"] = Portfolio.objects.all().order_by('-date')[:3]

	return render(request, 'core/index.html', context_general)

def contact_sucess(request):


	if request.method == 'POST':
			return HttpResponseRedirect('/')

	return render(request, 'core/success_form.html', {})

def load_more(request):

	if request.is_ajax():
		new_ports = Portfolio.objects.all().order_by('-date')[3:]
		ports_json = serializers.serialize('json', new_ports)

		return HttpResponse(ports_json, content_type='application/json')
	else:
		return Http404

def load_more_posts(request):

	if request.is_ajax():
		new_posts = Post.objects.all().order_by('-date')[3:]
		posts_json = serializers.serialize('json', new_posts)

		return HttpResponse(posts_json, content_type='application/json')
	else:
		return Http404
