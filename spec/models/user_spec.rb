require 'spec_helper'
require 'rails_helper'

describe User do
  describe "checks validations" do
    it "has a username" do
      user = User.new(username: '', password: 'password')
      expect(user).to be_invalid
    end

    it "has a password" do
      user = User.new(username: 'abcdef', password: '')
      expect(user). to be_invalid
    end

    it "password is 6 characters" do
      user = User.new(username: 'username', password: 'pass')
      expect(user).to be_invalid
    end

    it "create user when valid" do
      user = User.create!(username: 'abcdef', password: 'password')
      expect(User.count).to eq(1)
    end
  end
end
