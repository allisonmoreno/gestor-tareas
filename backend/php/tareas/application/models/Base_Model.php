<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Base_Model extends CI_Model {
 
    var $table = '';
    var $relation_table = '';
    var $relation_id = '';
    var $id_column = '';
    
    public function __construct(){
        parent::__construct();
    }

     function getAll(){
        $this->db->from($this->table);
        return $this->db->get()->result();
    }

    function getByID($id){
        $this->db->from($this->table);
        $this->db->limit(1);
        return $this->db->where($this->id_column,$id)->get()->row();
    }

    function deleteByID($id,$delete_relation = true){
        $this->db->delete($this->table, array($this->id_column => $id));  //baja física
        return (object)['success' => (($this->db->affected_rows() > 0) ? true : false)];
    }

    function addNew($data){
        $this->db->insert($this->table, $data); 
        return $this->db->insert_id();
    }

    function update($id,$data){
        $this->db->where($this->id_column, $id);
        $this->db->update($this->table, $data); 

        return ($this->db->affected_rows()>0) ? true : false;
    }

    function getLastID(){
        $this->db->from($this->table);
        $this->db->select('MAX('.$this->id_column.') AS id');
        $tmp = $this->db->get()->row();
        return (isset($tmp->id)) ? (int)$tmp->id : 0;
    }
}