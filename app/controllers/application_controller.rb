class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :devise_parameter_sanitizer, if: :devise_controller?
 
	def after_sign_in_path_for(user)
    	edit_user_registration_path
	end

 	def after_update_path_for(user)
  		#tbd
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
