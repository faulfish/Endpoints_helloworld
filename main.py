#!/usr/bin/env python

import webapp2
import utils
import json

import quopri
import base64

import logging

from google.appengine.api import users
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

def my_login_required(handler_method):
	def check_login(self, *args, **kwargs):
		if not users.get_current_user():
			return self.redirect("/")
		else:
			handler_method(self, *args, **kwargs)
	return check_login

class Handler(webapp2.RequestHandler):
	def write(self, *a, **kw):
		self.response.out.write(*a, **kw)

	def render_str(self, template, **params):
		t = utils.jinja_env.get_template(template)
		return t.render(params)

	def render(self, template, **kw):
		self.write(self.render_str(template, **kw))

	def initialize(self, *a, **kw):
		webapp2.RequestHandler.initialize(self, *a, **kw)

class MainPage(Handler):
	def get(self):
		self.render("landing.html")

app = webapp2.WSGIApplication([
	('/', MainPage),
], debug=True)
