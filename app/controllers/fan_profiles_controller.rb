class FanProfilesController < ApplicationController
  
	# before_filter :authenticate_user!

  require 'nokogiri'
  require 'open-uri'
  require 'httparty'


  def index
    get_weather
    get_league
    get_news
  end

  def show
  end

  def get_weather
  	@user = User.find(user_params)
    @weather = "showing weather"
    # state = current_user.state.gsub!(/\b\s\b/, "+").gsub!(/\b/, "")
    # state = state.gsub!(/ /,"")
    # city = current_user.city.gsub!(/ /, "+")
    #@state = state 
    # @city = city
    # url = "www.wunderground.com/weather-forecast/US/#{state}/#{user_city}.html"
    # puts @url
    #  # @temp = Nokogiri.HTML(open(url).css('#nowTemp, b')).to_html
    # # rain = Nokogiri.HTML(open(url).css('#curCond , #conds_details_cur, b')).to_html
  	return
  end



  def get_league
    @leagues = "showing leagues"
    # url = JSONHTTP GET "http://api.espn.com/:version/:resource/:method?apikey=:yourkey"
    #either get json or nokogiri scrape of MLS. Find retrieved tteams locations. USe geocoder to compare to user location
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
