from django.shortcuts import render, redirect, HttpResponse
from django.views.generic import View
from .forms import SubscriberForm
from .models import Subscriber
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail
import json


class Index(View):

    def get(self, request):
        form = SubscriberForm()
        return render(request, 'mainpage/index.html', {"form": form})


class UserSubscribe(View):

    def post(self, request):
        email = json.loads(request.body)
        email = email['email']
        was_already_subscribed = UserSubscribe.subscribe_user(self, email)
        if was_already_subscribed:
            return HttpResponse(json.dumps({'result': 'success'}))
        return HttpResponse(json.dumps({'result': 'fail'}))

    def subscribe_user(self, email):
        subscriber = Subscriber.objects.filter(email=email)
        if not subscriber:
            sub_obj = Subscriber()
            date_subscribed = sub_obj.calc_date_subscribed()
            new_subscriber = Subscriber(email=email, date_subscribed=date_subscribed)
            new_subscriber.save()
            return True
        return False

    # def send_email(self, email):
    #         # connection = mail.get_connection()
    #         # connection.open()
    #         #
    #         # signup_mail = mail.EmailMessage('Test', 'A message', 'mp12242@my.bristol.ac.uk', [email],
    #         #     connection = connection)
    #         # signup_mail.send()
    #
    #        #send_mail('Test', 'A message', settings.EMAIL_HOST_USER, ['maxprais@gmail.com'])

    # if was_already_subscribed:
    #         messages.add_message(request, messages.SUCCESS, 'You have been subscribed and will receive an email from us shortly')
    #         #UserSubscribe.send_email(self, email)
    #     else:
    #         messages.add_message(request, messages.SUCCESS, 'You are already subscribed!')
