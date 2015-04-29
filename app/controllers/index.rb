get "/" do
  erb :index
end

post "/login" do
  @player1 = Player.find_by(name: params[:player1])
  @player2 = Player.find_by(name: params[:player2])
  @track_length = params[:track_length]

  if @player1 && @player2 && request.xhr?
    content_type :json
    { track_length: @track_length, player1: @player1.name, player2: @player2.name, player1_wins: @player1.win_count, player2_wins: @player2.win_count }.to_json
  else
   "Invalid user(s), try again or you need to create a user."
  end
end

post "/signup" do
  @player = Player.new(name: params[:new_player])
  @signup_success = true

  if request.xhr? && @player.save
    erb :"_success", layout: false
  else
    "Username has already been taken, please pick another one!"
  end

end

get "/players" do
  @players = Player.all
  erb :stats
end

put "/players/:player_name/win" do
  @player = Player.find_by(name: params[:player_name])
  @player.win_count += 1
  @player.save
  content_type :json
  { new_player_win_count: @player.win_count }.to_json
end
