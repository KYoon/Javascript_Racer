class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.integer :win_count, default: 0

      t.timestamps
    end
  end
end
