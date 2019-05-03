<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct(){
	    header('Access-Control-Allow-Origin: *');
	    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	    header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header("Content-type: application/json");
        header("Cache-Control max-age=3600, must-revalidate");
        header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
        header("Cache-Control: no-store, no-cache, must-revalidate"); // HTTP/1.1
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache"); // HTTP/1.0
        header("Expires: ".gmdate("D, d M Y H:i:s")." GMT"); 
        $method = $_SERVER['REQUEST_METHOD'];
	    if($method == "OPTIONS") {
	        die();
	    }
	    parent::__construct();
	}

	public function index(){
		echo json_encode(['success' => true, 'message' => 'Welcome']);
	}


	public function searchUsers($nombre = ""){
        $this->load->database('default');
        $this->load->model('users_model','users');
        echo json_encode(['success' => true, 'data' => $this->users->searchByName($nombre)]);
        exit();
	}

	public function getLanes(){
        $this->load->database('default');
        $this->load->model('lanes_model','lanes');
        echo json_encode(['success' => true, 'data' => $this->lanes->getLanes(), 'nextID' => ($this->lanes->getLastID() + 1)]);
        exit();
	}
	
	public function setCardLane(){
		$post = json_decode(file_get_contents('php://input'), true);

		if (isset($post["cardId"])){
			
			$card_id = (int)$post["cardId"];
			$lane_id = (int)$post["laneId"];

			$this->load->database('default');
        	$this->load->model('cards_model','cards');

			if($card_id > 0){
				$this->cards->setLane($card_id,$lane_id);

				echo json_encode(['success' => true, 'message' => 'Carta Movida', 'cardId' => $card_id]);
			}else{
				echo json_encode(['success' => true, 'message' => 'Carta Inválida', 'cardId' => $card_id]);
			}
			
			
		}else{
			echo json_encode(['success' => false, 'message' => 'Hubo un problema al asignar la carta']);
		}
		exit();
	}

}
