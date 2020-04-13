class CreateFollowers < ActiveRecord::Migration[6.0]
  def change
    create_table :followers do |t|
      t.integer :client_id
      t.integer :therapist_id

      t.timestamps
    end
  end
end
