<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
require_once APPPATH . "/models/Base_Model.php";

class Lanes_model extends Base_model {
 
    public function __construct(){
        parent::__construct();
        $this->table = 'lanes';
        $this->id_column = 'id';
        $this->relation_table = 'lanes_cards';
        $this->relation_id = 'FK_id_card';
    }

    function getLanes(){
        $this->db->from($this->table);
        $results = $this->db->get()->result();

        foreach ($results as $key => $result) {
            $results[$key]->cards = $this->getCards($result->id);
        }


        return ['lanes' => $results];
    }

     function getCards($id_lane){
        $this->db->select("cards.*");
        $this->db->from($this->relation_table);
        $this->db->where('FK_id_lane', $id_lane);
        
        $this->db->join('cards', 'cards.id = '.$this->relation_table.'.FK_id_card');

        $this->load->model('users_model','users');

        $cards = $this->db->get()->result();

        if (count($cards)){
            foreach ($cards as $key => $card) {
                $user_id = (int)$card->FK_id_user;
                $cards[$key]->user = ($user_id > 0) ? $this->users->getByID($user_id) : [];
            }
        }

        return $cards;
    }

}