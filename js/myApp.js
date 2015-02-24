$(function () {
  window.FindUser = {
//var searchInput = '';
    username: $('#user-name'),
    searchButton: $('#search-button'),
    searchValue : function() {
      var searchInput = FindUser.username.val();
      console.log(searchInput);
      $.getJSON('https://api.github.com/users/'+searchInput, function(data){
        console.log (data);
        var info = '<div id="users">';
        info += '<div id="avatar"><img src="' + data.avatar_url+'" style="width:150px;height:150px;border:10px;border-radius:10px;border-color:gray"></div>';
        info += '<div id="followers">Followers: '+data.followers+'</div>';
        info += '<div id="following">Following: '+data.following+'</div>';
        info += '<div id="public repos">Public Repositories: '+data.public_repos+'</div>';

        
        $.getJSON('https://api.github.com/users/'+searchInput+'/repos', function(data){
          console.log (data);
          $.each(data,function(key, value){
            console.log(value.full_name);
            $('<li>'+value.full_name+'</li>').appendTo('#allRepos');
              $('ul').appendTo('#list');
          });
        });

        // $.getJSON('https')

        $('#users').html(info);
        info += '<div>'
      }).fail(function(error){
        console.log('Error:', error);
        $('.error').html('<p>Error Occured... Try again Later!</p>');
      });


    }
} 
  FindUser.searchButton.click(FindUser.searchValue);


});