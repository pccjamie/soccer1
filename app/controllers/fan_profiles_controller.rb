class FanProfilesController < ApplicationController

 after_filter :set_access_control_headers

  def set_access_control_headers
    headers["Access-Control-Allow-Origin"] = "*"
    headers["Access-Control-Request-Method"] = "*"
    headers["Access-Control-Allow-Headers"] = "Content-Type"
  end

# uncomment for  localhost testing
# skip_before_filter :authenticate_user!
  
  require 'nokogiri'
  require 'open-uri'
  require 'httparty'

  def index
    get_weather
    get_leagues
    get_news
  end

  def show
  end

  def get_weather
  	# current_user
  	# state = current_user.state
  	# city = current_user.city
    # state = current_user.state.gsub!(/\b\s\b/, "+").gsub!(/\b/, "")
    # state = state.gsub!(/ /,"")
    # city = current_user.city.gsub!(/ /, "%20")
    # weather = Nokogiri::HTML(open("http://weather.weatherbug.com/#{state}/#{city}-weather.html")).css("#divTemp").text
    weather = Nokogiri::HTML(open("http://weather.weatherbug.com/NY/New%20York-weather.html")).css("#divTemp").text
    @weather = weather
  	return
  end



  def get_leagues
    @leagues = "showing leagues"
 		return
  end

  def get_news
  	@news = "showing news"
  	return
  end


  private
  def user_params
    params.require(:user).permit!
  end
end
