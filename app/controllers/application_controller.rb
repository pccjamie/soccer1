class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :devise_parameter_sanitizer, if: :devise_controller?
  before_filter :authenticate_user!, :except => [:splash], :unless => :user_signed_in?

  require 'pry-rails'

  # before_filter :block_cache
  # def block_cache
  #   response.headers["Access-Control-Allow-Origin: facebook.com"]
  #   response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
  #   response.headers["Pragma"] = "no-cache"
  #   response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  # end

  # after_filter :set_access_control_headers

  # def set_access_control_headers
  #   response.headers["Access-Control-Allow-Origin"] = "*"
  #   response.headers["Access-Control-Request-Method"] = "*"
  #   response.headers["Access-Control-Allow-Headers"] = "Content-Type"
  #   response.headers["Content-Type"] = "application/json, text/html"
  # end


  def after_sign_in_path_for(user)
    home_index_path
    # edit_user_registration_path, unless: => :current_user
  end

  def after_sign_out_path_for(user)
    root_path
  end

  def after_update_path_for(user)
    home_index_path
  end

  #relies on lib/user_sanitizer.rb
  protected

  def devise_parameter_sanitizer
    if resource_class == User
      User::ParameterSanitizer.new(User, :user, params)
    else
      super
    end
  end

end