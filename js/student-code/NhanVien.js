function NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
  this.taiKhoan = taiKhoan
  this.hoTen = hoTen
  this.email = email
  this.matKhau = matKhau
  this.ngayLam = ngayLam
  this.luongCB = Number(luongCB)
  this.chucVu = chucVu
  this.gioLam = Number(gioLam)
  //Phương thức tính lương
  this.tongLuong = 0
  this.tinhLuong = function () {
    if (this.chucVu === "Sếp") { this.tongLuong = this.luongCB * 3 }
    else if (this.chucVu === "Trưởng phòng") { this.tongLuong = this.luongCB * 2 }
    else { this.tongLuong = this.luongCB }
  }
  //Phương thức xếp loại nhân viên
  this.loaiNV = ""
  this.xepLoaiNV = function () {
    if (this.gioLam >= 192) { this.loaiNV = "Xuất sắc" }
    else if (this.gioLam >= 172) { this.loaiNV = "Giỏi" }
    else if (this.gioLam >= 160) { this.loaiNV = "Khá" }
    else { this.loaiNV = "Trung bình" }
  }
}