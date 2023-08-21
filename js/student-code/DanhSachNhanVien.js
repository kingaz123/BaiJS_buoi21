function DanhSachNhanVien() {
  // mảng đối tượng chứa các đối tượng NhanVien (các instance của lớp NhanVien)
  this.mangNV = []
  //! Phương thức thêm đối tượng nhân viên mới vào mảng
  this.themNV = function (employee) {
    this.mangNV.push(employee)
  }
  //! Xóa nhân viên
  this.xoaNV = function (maXoa) {
    var indexXoa = this.mangNV.findIndex(function (employee) {
      return employee.taiKhoan == maXoa
    })
    this.mangNV.splice(indexXoa, 1)
  }
  //! Xem nhân viên
  this.xemNV = function (maXem) {
    var employeeFind = this.mangNV.find(function (employee) {
      return employee.taiKhoan == maXem
    })
    return employeeFind
  }
  //! Cập nhật nhân viên
  this.capNhat = function (nvUpdate) {
    var indexUpdate = this.mangNV.findIndex(function (employee) {
      return employee.taiKhoan == nvUpdate.taiKhoan;
    });
    if (indexUpdate > -1) {
      this.mangNV[indexUpdate] = nvUpdate
    }
  }
  //!Tìm kiếm nhân viên theo loại
  this.searchByRating = function (tuTK) {
    var mangTK = []
    var tuTKXoaSpace = tuTK.toLowerCase().replace(/\s/g, "")
    this.mangNV.map(function (employee) {
      var indexTK = employee.loaiNV.toLowerCase().replace(/\s/g, "").indexOf(tuTKXoaSpace)
      if (indexTK > -1) {
        mangTK.push(employee)
      }
    })
    return mangTK
  }
}