/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 *
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

function prompt(question) {
  return readlineSync.question(question + ' ');
}

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function isNullEmptyOrUndefined(inputString) {
  return !inputString || inputString.trim() === '';
}

function addNewStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Siswa Baru ---\n');
  // TODO: Lengkapi implementasi
  try {
    const id = prompt('Masukkan ID Siswa:');
    const name = prompt('Masukkan Nama:');
    const className = prompt('Masukkan Kelas:');

    if (isNullEmptyOrUndefined(id)) {
      console.log('\n>> Error: ID siswa tidak boleh kosong! <<');
      return;
    }

    if (isNullEmptyOrUndefined(name)) {
      console.log('\n>> Error: Nama siswa tidak boleh kosong! <<');
      return;
    }

    if (isNullEmptyOrUndefined(className)) {
      console.log('\n>> Error: Kelas tidak boleh kosong! <<');
      return;
    }

    const student = new Student(id, name, className);
    if (manager.addStudent(student)) console.log('\n>> Data siswa berhasil ditambahkan! <<');
    else console.log('\n>> Error : ID siswa harus unik! <<');
  } catch (error) {
    console.error('\n>> Error:', error.message);
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  // Implementasi di sini
  console.log('\n--- Daftar Semua Siswa ---');
  // TODO: Lengkapi implementasi
  manager.displayAllStudents();
  console.log('\n--------------------------');
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  // Implementasi di sini
  console.log('\n--- Cari Siswa ---\n');
  // TODO: Lengkapi implementasi
  const id = prompt('Masukkan ID Siswa:');
  if (isNullEmptyOrUndefined(id)) {
    console.log('\n>> Error: ID siswa tidak boleh kosong! <<');
    return;
  }
  const student = manager.findStudent(id);

  if (student) {
    console.log('\n--- Data ditemukan ---');
    student.displayInfo();
  } else {
    console.log('\n>> Data siswa tidak ditemukan. <<');
  }
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  // Implementasi di sini
  console.log('\n--- Update Data Siswa ---');
  // TODO: Lengkapi implementasi
  const id = prompt('\nMasukkan ID Siswa yang akan diupdate:');
  if (isNullEmptyOrUndefined(id)) {
    console.log('\n>> Error: ID siswa tidak boleh kosong! <<');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log('\n>> Siswa tidak ditemukan. <<');
    return;
  }

  console.log('\n--- Data ditemukan ---');
  student.displayInfo();

  try {
    const name = prompt('\nNama baru (kosongkan jika tidak ingin mengubah):');
    const className = prompt('Kelas baru (kosongkan jika tidak ingin mengubah):');

    const updates = {};
    if (name) updates.name = name;
    if (className) updates.studentClass = className;

    if (Object.keys(updates).length > 0) {
      manager.updateStudent(id, updates);
      console.log('\n>> Data siswa berhasil diupdate! <<');
    } else {
      console.log('\n>> Tidak ada perubahan yang dilakukan. <<');
    }
  } catch (error) {
    console.error('\n>> Error:', error.message);
  }
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  // Implementasi di sini
  console.log('\n--- Hapus Siswa ---');
  // TODO: Lengkapi implementasi
  const id = prompt('\nMasukkan ID Siswa yang akan dihapus:');
  if (isNullEmptyOrUndefined(id)) {
    console.log('\n>> Error: ID siswa tidak boleh kosong! <<');
    return;
  }

  const confirm = readlineSync.keyInYN('Apakah Anda yakin ingin menghapus siswa ini?');
  if (confirm) {
    const success = manager.removeStudent(id);
    console.log(success ? '\n>> Siswa berhasil dihapus! <<' : '\n>> Gagal menghapus siswa. ID tidak ditemukan. <<');
  } else {
    console.log('\n>> Penghapusan dibatalkan. <<');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function isValidNumber(inputNumber) {
  if (typeof inputNumber !== 'number' || inputNumber < 0 || inputNumber > 100) return false;
  return true;
}

function addGradeToStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Nilai Siswa ---');
  // TODO: Lengkapi implementasi
  const id = prompt('\nMasukkan ID Siswa:');
  if (isNullEmptyOrUndefined(id)) {
    console.log('\n>> Error: ID siswa tidak boleh kosong! <<');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log('\n>> Data siswa tidak ditemukan. <<');
    return;
  }
  console.log('\n--- Data ditemukan ---');
  student.displayInfo();

  try {
    const subject = prompt('\nMata Pelajaran:');

    if (isNullEmptyOrUndefined(subject)) {
      throw new Error('Mata Pelajaran tidak boleh kosong! <<');
    }

    const score = parseFloat(prompt('Nilai (0-100):'));

    if (isNaN(score)) {
      throw new Error('Nilai salah, nilai harus berupa angka');
    }

    if (!isValidNumber(score)) {
      throw new Error('Nilai salah, nilai harus antara 0 dan 100');
    }

    student.addGrade(subject, score);
    console.log('\n>> Nilai berhasil ditambahkan! <<');
    console.log('\n--- Data terupdate ---');
    student.displayInfo();
  } catch (error) {
    console.error('\n>> Error:', error.message);
  }
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  // Implementasi di sini
  console.log('\n--- Top 3 Siswa ---');
  // TODO: Lengkapi implementasi
  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log('\n>> Tidak ada data siswa. <<');
    return;
  }

  topStudents.forEach((student, index) => {
    console.log(`\n---[Peringkat ${index + 1}]:`);
    student.displayInfo();
  });
  console.log('\n------------------------');
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');

  // TODO: Implementasikan loop utama program
  let running = true;

  while (running) {
    // Tampilkan menu
    displayMenu();
    // Baca pilihan user
    const choice = prompt('\nPilih menu (1-8):');
    // Jalankan action sesuai pilihan
    // TODO: Lengkapi implementasi
    // Hint: gunakan switch-case untuk handle berbagai pilihan
    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('\n>> Pilihan tidak valid. Silakan pilih 1-8.');
    }

    if (running && choice !== '8') {
      prompt('\nTekan Enter untuk melanjutkan...');
    }
  }

  console.log('\nTerima kasih telah menggunakan aplikasi ini!\n');
}

// Jalankan aplikasi
main();
