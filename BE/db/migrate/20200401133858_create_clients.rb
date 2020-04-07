class CreateClients < ActiveRecord::Migration[6.0]
  def change
    create_table :clients do |t|
      t.references :user, null: false, foreign_key: true
      t.string :hobbies
      t.string :occupation
      t.string :bio

      t.timestamps
    end
  end
end
