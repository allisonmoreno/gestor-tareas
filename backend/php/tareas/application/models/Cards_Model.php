<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
require_once APPPATH . "/models/Base_Model.php";

class Cards_model extends Base_model {
 
    public function __construct(){
        parent::__construct();
        $this->table = 'cards';
        $this->id_column = 'id';
        $this->relation_table = 'lanes_cards';
        $this->relation_id = 'FK_id_lane';
    }

    function setLane($card_id,$lane_id){
        $this->db->delete($this->relation_table, array('FK_id_card' => $card_id));
        $this->db->insert($this->relation_table, [$this->relation_id => $lane_id, 'FK_id_card' => $card_id]); 
    }
}