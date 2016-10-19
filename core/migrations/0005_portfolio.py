# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-19 04:15
from __future__ import unicode_literals

from django.db import migrations, models
import djrichtextfield.models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20161013_1811'),
    ]

    operations = [
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('miniature_title', models.CharField(max_length=30)),
                ('category', models.CharField(max_length=30)),
                ('miniature_image', models.ImageField(null=True, upload_to='portfolio/miniatures/%Y/%m/%d')),
                ('project_name', models.CharField(max_length=30)),
                ('intro', models.CharField(max_length=30)),
                ('image', models.ImageField(null=True, upload_to='portfolio/images/%Y/%m/%d')),
                ('description', djrichtextfield.models.RichTextField()),
                ('date', models.DateTimeField()),
                ('client', models.CharField(max_length=20)),
            ],
        ),
    ]