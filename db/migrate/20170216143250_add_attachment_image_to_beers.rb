class AddAttachmentImageToBeers < ActiveRecord::Migration
  def self.up
    change_table :beers do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :beers, :image
  end
end
