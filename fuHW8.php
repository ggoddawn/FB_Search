<?php
	if(isset($_GET["key"])){
		$URL = "https://graph.facebook.com/v2.8/search?q=";
		$URL .= urlencode($_GET["key"])."&type=".urlencode($_GET["type"])."&fields=id,name,picture.width(700).height(700)&access_token=EAACEdEose0cBAOqZCZBZBYgKZBZAOGzLZBHmaZAUrUhZB4vMsDZAZC3EVZByPWYZCNXr6ZCzZBrmBKZCV1UUnqOi50Obz8ZBSBgTTED2kthl6ZAm6Vfc0BXSCQx5fp9nIqZAbzZCJk3fTZA5MZBfmArzVkXOLk1Ct7Sn5ggCiwq103OJ62ZC2un24UuUGcHSIxZCt5hyUhGjkbJUhtm28aAWn2h5AZDZD";
		$arrContextOptions=array(
                            "ssl"=>array(
                                "verify_peer"=>false,
                                "verify_peer_name"=>false,
                            ),
                        ); 	
		$json = file_get_contents($URL,false, stream_context_create($arrContextOptions));
    	echo $json;
	}

	if(isset($_GET["pkey"])){
		$URL = "https://graph.facebook.com/v2.8/search?q=";
		$URL .= urlencode($_GET["pkey"])."&type=place&fields=id,name,picture.width(700).height(700)&center=".urlencode($_GET["lalo"])."&access_token=EAACEdEose0cBAOqZCZBZBYgKZBZAOGzLZBHmaZAUrUhZB4vMsDZAZC3EVZByPWYZCNXr6ZCzZBrmBKZCV1UUnqOi50Obz8ZBSBgTTED2kthl6ZAm6Vfc0BXSCQx5fp9nIqZAbzZCJk3fTZA5MZBfmArzVkXOLk1Ct7Sn5ggCiwq103OJ62ZC2un24UuUGcHSIxZCt5hyUhGjkbJUhtm28aAWn2h5AZDZD";
		$arrContextOptions=array(
                            "ssl"=>array(
                                "verify_peer"=>false,
                                "verify_peer_name"=>false,
                            ),
                        ); 	
		$json = file_get_contents($URL,false, stream_context_create($arrContextOptions));
    	echo $json;
	}

	if(isset($_GET["id"])){
		$URLD = "https://graph.facebook.com/v2.8/";
		$URLD .= urlencode($_GET["id"])."?fields=albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5)&access_token=EAACEdEose0cBAOqZCZBZBYgKZBZAOGzLZBHmaZAUrUhZB4vMsDZAZC3EVZByPWYZCNXr6ZCzZBrmBKZCV1UUnqOi50Obz8ZBSBgTTED2kthl6ZAm6Vfc0BXSCQx5fp9nIqZAbzZCJk3fTZA5MZBfmArzVkXOLk1Ct7Sn5ggCiwq103OJ62ZC2un24UuUGcHSIxZCt5hyUhGjkbJUhtm28aAWn2h5AZDZD";
		$arrContextOptions=array(
                            "ssl"=>array(
                                "verify_peer"=>false,
                                "verify_peer_name"=>false,
                            ),
                        ); 	
		$json = file_get_contents($URLD,false, stream_context_create($arrContextOptions));
    	echo $json;
	}
	if(isset($_GET["picid"])){
		$URLP = "https://graph.facebook.com/v2.8/";
		$URLP .= urlencode($_GET["picid"])."/picture?access_token=EAACEdEose0cBAOqZCZBZBYgKZBZAOGzLZBHmaZAUrUhZB4vMsDZAZC3EVZByPWYZCNXr6ZCzZBrmBKZCV1UUnqOi50Obz8ZBSBgTTED2kthl6ZAm6Vfc0BXSCQx5fp9nIqZAbzZCJk3fTZA5MZBfmArzVkXOLk1Ct7Sn5ggCiwq103OJ62ZC2un24UuUGcHSIxZCt5hyUhGjkbJUhtm28aAWn2h5AZDZD";
    	$arrContextOptions=array(
                            "ssl"=>array(
                                "verify_peer"=>false,
                                "verify_peer_name"=>false,
                            ),
                        ); 	
		$json = file_get_contents($URLP,false, stream_context_create($arrContextOptions));
    	echo $json;
    }
?>