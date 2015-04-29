require 'faker'

Player.create!(name: "Kevin", win_count: 15)

10.times do
  Player.create!(name: Faker::Name.first_name, win_count: rand(1..20))
end
