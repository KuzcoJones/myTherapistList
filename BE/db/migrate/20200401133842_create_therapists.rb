class CreateTherapists < ActiveRecord::Migration[6.0]
  def change
    create_table :therapists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :bio
      t.string :location
      t.string :services
      t.string :specialties

      t.timestamps
    end
  end
end
