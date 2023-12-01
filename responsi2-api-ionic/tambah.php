<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$nama = trim($data['nama']);
$keterangan = trim($data['keterangan']);
http_response_code(201);
if ($nama != '' and $keterangan != '') {
    $query = mysqli_query($koneksi, "insert into kehadiran(nama,keterangan) values('$nama','$keterangan')");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
