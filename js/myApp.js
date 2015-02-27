$(function(){
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

      $.getJSON('https://api.github.com/users/'+searchInput+'/repos', function(repos) {
        $.each(repos, function(key, value) {
          $('<li id="links"><a href='+value.html_url+' target="_blank">'+value.full_name+'</a></li>').appendTo("#allRepos");
            $("ul").appendTo("#list");
        }); 
      });

      $("#numOrg").show();
        $.getJSON('https://api.github.com/users/'+searchInput+'/orgs', function(orgs) {
          $("#numOrg").html('<div id="numOrg">Organizations<br />'+orgs.length+'</div>');
        });


      $('#users').html(info);
        info += '<div>';
      }).fail(function(error){
        console.log('Error:', error);
      $('.error').html('<p>Error Occured... Try again Later!</p>');
      
      });


    }
}; 
      $("#search-button").click(function () {
        $('#allRepos').empty();
      });
      FindUser.searchButton.click(FindUser.searchValue);


});
