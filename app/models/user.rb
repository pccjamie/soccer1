class User < ActiveRecord::Base

  # include ActionView::Helpers
  has_and_belongs_to_many :teams

  geocoded_by :city
  after_validation :geocode

  belongs_to :profilable, :polymorphic => true

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]

  #on Rails4, but keeping attr_accessible in model and using protected attr gem temporarily.
  #At least until project delivery is completed. Next step: Move attribute control into an appropriate User or Devise controller.
  attr_accessible  :name, :email, :password, :password_confirmation, :remember_me, :provider, :uid, :location, :picture, :first_name, :city, :state, :profile,:primary_team

  validates :profile, :presence => true


  #find an existing user by uid or create one otherwise.

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(name:auth.extra.raw_info.name,
                         first_name:auth.info[:first_name],
                         provider:auth.provider,
                         uid:auth.uid,
                         location:auth.info[:location],
                         city: auth.info[:location].split(',').first,
                         state: auth.info[:location].split(',').last,

                         #LOGIN AND SAVE
                         #location:auth.extra.raw_info["gender"],# GOOD SAVE, RIGHT HASH
                         #location:auth.extra.raw_info[:gender]


                         #LOGIN, And NO SAVE
                         # location:auth.extra.raw_info[:location],
                         # location:auth.extra.raw_info["location"],

                         # ERROR
                         #location:auth.extra.raw_info.location["name"],
                         #location:auth.extra.raw_info.location.name,
                         #location:auth.extra.raw_info["location"].flatten,
                         #location:auth.extra.raw_info[:location][:name],
                         #location:auth.extra.raw_info["location"]["name"],

                         picture: auth.info[:image],
                         email:auth.info.email,
                         password:Devise.friendly_token[0,20]
                         )
    end
    user
  end

  # def self.new_with_session(params, session)
  #   super.tap do |user|
  #     if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
  #       user.location = data["location"] if user.location_changed?
  #     end
  #   end
  # end



end