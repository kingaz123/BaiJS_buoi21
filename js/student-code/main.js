var dsnv = new DanhSachNhanVien()
var validation = new Validation()
function ele(query) {
  return document.querySelector(query)
}
function themNhanVien() {
  var taiKhoan = ele("#tknv").value
  var hoTen = ele("#name").value
  var email = ele("#email").value
  var matKhau = ele("#password").value
  var ngayLam = ele("#datepicker").value
  var luongCB = ele("#luongCB").value
  var chucVu = ele("#chucvu").value
  var gioLam = ele("#gioLam").value
  //!Validation
  var isValid = true
  /**
   * ? Tài khoản:
   * 1. không được để trống
   * 2. Tài khoản không được trùng
   * 3. Tài khoản có từ 4-6 ký số
   */
  isValid =
    validation.checkEmpty(taiKhoan, "Tài khoản không được để trống", "tbTKNV") && validation.checkTK(taiKhoan, "Số tài khoản này đã được đăng ký", "tbTKNV", dsnv.mangNV) && validation.checkSoTK(taiKhoan, "Tài khoản phải là 4-6 ký số", "tbTKNV")
  /**
   * ? Họ tên:
   * 1. không được để trống
   * 2. Chỉ bao gồm ký tự chữ
   */
  isValid &= validation.checkEmpty(hoTen, "Họ tên không được để trống", "tbTen") && validation.checkName(hoTen, "Họ tên phải là ký tự chữ (không được bao gồm số hay ký tự đặc biệt)", "tbTen")
  /**
   * ? Email:
   * 1. không được để trống
   * 2. Đúng định dạng email
   */
  isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email không đúng định dạng", "tbEmail")
  /**
  * ? Mật khẩu:
  * 1. không được để trống
  * 2. mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)
  */
  isValid &= validation.checkEmpty(matKhau, "Mật khẩu không được để trống", "tbMatKhau") && validation.checkPassword(matKhau, "Mật khẩu phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)", "tbMatKhau")
  /**
  * ? Ngày làm:
  * 1. không được để trống
  * 2. đúng định dạng mm/dd/yyyy
  */
  isValid &= validation.checkEmpty(ngayLam, "Ngày làm không được để trống", "tbNgay") && validation.checkDate(ngayLam, "Ngày làm không đúng định dạng", "tbNgay")
  /**
   * ? Lương cơ bản:
   * 1. Không được để trống
   * 2. Phải định dạng số 
   * 3. Phải từ 1 triệu cho đến 20 triệu
   */
  isValid &= validation.checkEmpty(luongCB, "Lương cơ bản không được để trống", "tbLuongCB") && validation.checkSo(luongCB, "Lương cơ bản phải là định dạng số (từ 1 triệu đến 20 triệu)", "tbLuongCB") && validation.checkSalary(luongCB, "Lương cơ bản phải từ 1 triệu đến 20 triệu", "tbLuongCB")
  /**
   * ? Chức vụ:
   * Phải chọn chức vụ hợp lệ
   */
  isValid &= validation.checkPosition("Bạn phải chọn một chức vụ cụ thể", "tbChucVu")
  /**
  * ? Giờ làm:
  * 1. Không được để trống
  * 2. Phải định dạng số 
  * 3. Số giờ làm phải trong khoảng 80 - 200 giờ
  */
  isValid &= validation.checkEmpty(gioLam, "Giờ làm không được để trống", "tbGiolam") && validation.checkSo(gioLam, "Giờ làm phải là định dạng số (từ 80 đến 200 giờ)", "tbGiolam") && validation.checkHours(gioLam, "Giờ làm phải từ 8 đến 20 giờ", "tbGiolam")

  // Nếu input thỏa mãn mọi điều kiện (isValid) --> thêm nhân viên
  if (isValid) {
    // tạo 1 đối tượng nhân viên mới (1 instance của lớp đối tượng NhanVien)
    var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, Number(luongCB), chucVu, Number(gioLam))
    //tính tổng lương của đối tượng nhân viên đó
    nv.tinhLuong();
    //xếp loại nhân viên
    nv.xepLoaiNV();
    // thêm nhân viên vào mảng
    dsnv.themNV(nv)
    // lưu thay đổi (sau khi đã thêm nhân viên mới) vào local storage
    setLocalStorage()
    // lấy dữ liệu từ local storage hiện thị lên UI
    getLocalStorage()
    // Sau khi thêm nhân viên thì phải reset form để form trống trong lần thêm nhân viên sau
    resetModal()
    //Sau khi bấm nút "thêm nhân viên" thì form modal nên tự đóng để cho người dùng thấy danh sách có nhân viên đã thêm (tốt cho UX):
    document.querySelector('#modal-footer #btnDong').click()
  }
}
// Gán chức năng thêm nhân viên vào nút thêm nhân viên của modal form
ele("#btnThemNV").onclick = themNhanVien
//!Function lưu dữ liệu vào local storage
function setLocalStorage() {
  localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV))
}
//!Function lấy dữ liệu từ local storage hiển thị lên UI
function getLocalStorage() {
  if (localStorage.getItem("DSNV") != null) {
    dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
    hienThiDSNV(dsnv.mangNV);
  }
}
//Để getLocalStorage ở ngoài cùng để danh sách nhân viên luôn được hiển thị lên UI mỗi khi load trang.
getLocalStorage()
//Chức năng lấy dữ liệu từ một mảng để để hiển thị lên UI
function hienThiDSNV(mang) {
  var content = ""
  mang.map(function (nv) {
    var trELE = `<tr>
          <td>${nv.taiKhoan}</td>
          <td>${nv.hoTen}</td>
          <td>${nv.email}</td>
          <td>${nv.ngayLam}</td>
          <td>${nv.chucVu}</td>
          <td>${nv.tongLuong}</td>
          <td>${nv.loaiNV}</td>
          <td>
          <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
          <button class="btn btn-info" onclick="hienThiChiTiet('${nv.taiKhoan}')"
          data-toggle="modal" data-target="#myModal" id="btnSua"
          >Xem</button>
          </td>
     </tr>
    `
    content += trELE;
  })
  ele("#tableDanhSach").innerHTML = content
}
//!Chức năng xóa nhân viên
function xoaNhanVien(maXoa) {
  dsnv.xoaNV(maXoa);
  setLocalStorage();
  getLocalStorage();
}
//! Chức năng xem nhân viên
function hienThiChiTiet(maXem) {
  var nvFind = dsnv.xemNV(maXem)
  ele("#tknv").value = nvFind.taiKhoan
  ele("#tknv").disabled = true
  ele("#name").value = nvFind.hoTen
  ele("#email").value = nvFind.email
  ele("#password").value = nvFind.matKhau
  ele("#datepicker").value = nvFind.ngayLam
  ele("#luongCB").value = nvFind.luongCB
  ele("#chucvu").value = nvFind.chucVu
  ele("#gioLam").value = nvFind.gioLam
}
//! Chức năng reset form (làm trống lại form sau khi điền)
function resetModal() {
  ele(".modal-body form").reset();
  ele("#tknv").disabled = false;
}
//Khi trang vừa chạy, form được reset
resetModal()
//Khi bấm nút "thêm nhân viên" (không phải nút "thêm nhân viên" trong form mà nút "thêm nhân viên" ở giao diện ngoài cùng), form được reset để thêm dữ liệu mới
ele("#btnThem").onclick = resetModal

//! Chức năng cập nhật nhân viên
function capNhatNV() {
  var taiKhoan = ele("#tknv").value
  var hoTen = ele("#name").value
  var email = ele("#email").value
  var matKhau = ele("#password").value
  var ngayLam = ele("#datepicker").value
  var luongCB = ele("#luongCB").value
  var chucVu = ele("#chucvu").value
  var gioLam = ele("#gioLam").value

  //!Validation
  var isValid = true
  //Check tên
  isValid &= validation.checkEmpty(hoTen, "Họ tên không được để trống", "tbTen") && validation.checkName(hoTen, "Họ tên phải là ký tự chữ (không được bao gồm số hay ký tự đặc biệt)", "tbTen")
  //Check email
  isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email không đúng định dạng", "tbEmail")
  //Check mật khẩu
  isValid &= validation.checkEmpty(matKhau, "Mật khẩu không được để trống", "tbMatKhau") && validation.checkPassword(matKhau, "Mật khẩu phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)", "tbMatKhau")
  //Check ngày làm
  isValid &= validation.checkEmpty(ngayLam, "Ngày làm không được để trống", "tbNgay") && validation.checkDate(ngayLam, "Ngày làm không đúng định dạng", "tbNgay")
  //Check lương CB
  isValid &= validation.checkEmpty(luongCB, "Lương cơ bản không được để trống", "tbLuongCB") && validation.checkSo(luongCB, "Lương cơ bản phải là định dạng số (từ 1 triệu đến 20 triệu)", "tbLuongCB") && validation.checkSalary(luongCB, "Lương cơ bản phải từ 1 triệu đến 20 triệu", "tbLuongCB")
  //Check chức vụ
  isValid &= validation.checkPosition("Bạn phải chọn một chức vụ cụ thể", "tbChucVu")
  //Check giờ làm
  isValid &= validation.checkEmpty(gioLam, "Giờ làm không được để trống", "tbGiolam") && validation.checkSo(gioLam, "Giờ làm phải là định dạng số (từ 80 đến 200 giờ)", "tbGiolam") && validation.checkHours(gioLam, "Giờ làm phải từ 8 đến 20 giờ", "tbGiolam")
  if (isValid) {
    var nvUpdate = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, Number(luongCB), chucVu, Number(gioLam));
    nvUpdate.tinhLuong()
    nvUpdate.xepLoaiNV()
    dsnv.capNhat(nvUpdate)
    setLocalStorage()
    getLocalStorage()
    resetModal()
    document.querySelector('#modal-footer #btnDong').click()
  }
}
//Gán chức năng cập nhật vào nút "Cập nhật" của modal form
ele("#btnCapNhat").onclick = capNhatNV
//! Chức năng tìm kiếm nhân viên theo xếp loại
document.getElementById("btnTimNV").onclick = function () {
  var tuTK = document.getElementById("searchName").value;
  var mangTK = dsnv.searchByRating(tuTK)
  hienThiDSNV(mangTK)
}
//Từ động tìm kiếm khi từng chữ được gõ vào ô input
document.getElementById("searchName").onkeydown = function () {
  var tuTK = document.getElementById("searchName").value;
  var mangTK = dsnv.searchByRating(tuTK);
  hienThiDSNV(mangTK)
}
