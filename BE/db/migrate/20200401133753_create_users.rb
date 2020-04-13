class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :full_name
      t.string :password_digest
      t.boolean :isTherapist
      t.string :bio
      t.string :location
      t.string :services
      t.string :specialty
      t.string :hobbies
      t.string :occupation

      t.timestamps
    end
  end
end
