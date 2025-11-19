/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 *
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 *
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}

  constructor(id, name, studentClass) {
    // Implementasi constructor di sini
    this.id = id;
    this.name = name;
    this.studentClass = studentClass;
    this.grades = {};
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    // Implementasi method di sini
    if (typeof score !== 'number' || score < 0 || score > 100) {
      throw new Error('Nilai salah, nilai harus antara 0 dan 100');
    }
    this.grades[subject] = score;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    // Implementasi method di sini
    const subjects = Object.keys(this.grades);
    if (subjects.length === 0) return 0;

    const sum = subjects.reduce((total, subject) => {
      return total + this.grades[subject];
    }, 0);

    return parseFloat((sum / subjects.length).toFixed(2));
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    // Implementasi method di sini
    return this.getAverage() >= 75 ? 'Lulus' : 'Tidak Lulus';
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    // Implementasi method di sini
    console.log(`\nID: ${this.id}`);
    console.log(`Nama: ${this.name}`);
    console.log(`Kelas: ${this.studentClass}`);

    if (Object.keys(this.grades).length > 0) {
      console.log('\nMata Pelajaran:');

      Object.entries(this.grades).forEach(([subject, score]) => {
        console.log(`  - ${subject}: ${score}`);
      });

      console.log(`\nRata-rata: ${this.getAverage().toFixed(2)}`);
      console.log(`Status: ${this.getGradeStatus()}`);
    }
  }
}

export default Student;
