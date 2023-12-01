import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-kehadiran',
  templateUrl: './kehadiran.page.html',
  styleUrls: ['./kehadiran.page.scss'],
})
export class kehadiranPage implements OnInit {
  datakehadiran: any = [];
  id: number | null = null;
  nama: string = '';
  keterangan: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController,
    private router: Router  // Injeksi Router
  ) {}

  ngOnInit() {
    this.getkehadiran();
  }

  getkehadiran() {
    this._apiService.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.datakehadiran = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.nama = '';
    this.keterangan = '';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilkehadiran(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahkehadiran() {
    if (this.nama != '' && this.keterangan != '') {
      let data = {
        nama: this.nama,
        keterangan: this.keterangan,
      };
      this._apiService.tambah(data, '/tambah.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah kehadiran');
          this.getkehadiran();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah kehadiran');
        },
      });
    } else {
      console.log('gagal tambah kehadiran karena masih ada data yg kosong');
    }
  }

  hapuskehadiran(id: any) {
    this._apiService.hapus(id, '/hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getkehadiran();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilkehadiran(id: any) {
    this._apiService.lihat(id, '/lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let kehadiran = hasil;
        this.id = kehadiran.id;
        this.nama = kehadiran.nama;
        this.keterangan = kehadiran.keterangan;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editkehadiran() {
    let data = {
      id: this.id,
      nama: this.nama,
      keterangan: this.keterangan,
    };
    this._apiService.edit(data, 'edit.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getkehadiran();
        console.log('berhasil edit kehadiran');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit kehadiran ' + err.message);
      },
    });
  }

  logout() {
    // Lakukan proses logout seperti membersihkan token atau sesi yang ada
    // Misalnya, menghapus token dari localStorage
    localStorage.removeItem('token-saya');
    localStorage.removeItem('namasaya');

    // Redirect ke halaman login
    this.router.navigate(['/login']);
  }
}
