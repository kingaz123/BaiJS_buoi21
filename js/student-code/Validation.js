function Validation() {
  //! Check không được để trống
  this.checkEmpty = function (value, message, spanID) {
    if (value.trim() != "") {
      //value không bị rỗng => dữ liệu đúng
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true; // lệnh thoát khỏi hàm
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  //! Kiểm tra dữ liệu nhập vào có phải là dạng số không (cho input lương và giờ làm):
  this.checkSo = function (value, message, spanID) {
    var pattern = /^[0-9]+$/;
    var result = value.match(pattern);
    if (result) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  //! Check tài khoản không được trùng với tài khoản đã tồn tại trên hệ thống
  this.checkTK = function (value, message, spanID, mang) {
    var isExist = mang.some(function (employee) {
      return employee.taiKhoan == value.trim();
    });
    if (isExist) {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
    document.getElementById(spanID).innerHTML = "";
    document.getElementById(spanID).style.display = "none";
    return true
  };
  //! Check tài khoản được nhập phải là 4-6 ký số.
  this.checkSoTK = function (value, message, spanID) {
    var pattern = /^[0-9]+$/;
    var result = value.match(pattern);
    if (result && value.length >= 4 && value.length <= 6) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  //! Check tên phải là ký tự chữ
  this.checkName = function (value, message, spanID) {
    var pattern =
      /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
    var result = value.match(pattern);
    if (result) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  //! Check email
  this.checkEmail = function (value, message, spanID) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (value.match(pattern)) {
      //hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message
    document.getElementById(spanID).style.display = "block"
    return false
  };
  //! Check password có từ 6-10 ký tự  (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)
  this.checkPassword = function (value, message, spanID) {
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/
    if (value.match(pattern)) {
      //hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message
    document.getElementById(spanID).style.display = "block"
    return false
  };
  //! Check ngày làm đúng định dạng mm/dd/yyyy
  this.checkDate = function (value, message, spanID) {
    var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
    if (value.match(pattern)) {
      //hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message
    document.getElementById(spanID).style.display = "block"
    return false
  };
  //! Check lương trong khoảng 1 triệu đến 20 triệu
  this.checkSalary = function (value, message, spanID) {
    const salary = Number(value)
    if (salary >= 1000000 && salary <= 20000000) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  //! Check đã chọn chức vụ chưa
  this.checkPosition = function (message, spanID) {
    var index = document.getElementById("chucvu").selectedIndex
    if (index != 0) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message
    document.getElementById(spanID).style.display = "block"
    return false
  };
  //! Check số giờ làm trong tháng là từ 80 - 200 giờ
  this.checkHours = function (value, message, spanID) {
    const hours = Number(value)
    if (hours >= 80 && hours <= 200) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
}

