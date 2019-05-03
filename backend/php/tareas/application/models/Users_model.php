<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
require_once APPPATH . "/models/Base_Model.php";

class Users_model extends Base_model {
 
    public function __construct(){
        parent::__construct();
        $this->table = 'users';
        $this->id_column = 'id';
    }

    function searchByName($input){
        $this->db->from($this->table); 
        $this->db->like('name', $input); 
        return $this->db->get()->result();
    }
}