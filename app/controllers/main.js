var nguoiDungService = new NguoiDungService();

getListUser();

getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm người dùng";

  var footer = `
        <button class="btn btn-success" onclick="ThemNguoiDung()">Thêm</button>
    `;

  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  getEle("TaiKhoan").value = ""
  getEle("HoTen").value = ""
  getEle("MatKhau").value = ""
  getEle("Email").value = ""
  getEle("SoDienThoai").value = ""
  getEle("loaiNguoiDung").value = "GV"
});
// SET LOCALSTORAGE
function setLocalStorage(list) {
  localStorage.setItem('DSND', JSON.stringify(list))
}
function getLocalStorage(){
  return JSON.parse(localStorage.getItem('DSND'));
}
// SEARCH USER

document.getElementById('valueInput').addEventListener('keyup', function () {
  var listUserServerSend= getLocalStorage();
  var value = document.getElementById('valueInput').value;
  let list= nguoiDungService.timKiemNguoiDung(value,listUserServerSend)
  renderTable(list)
  
})
// getEle('_handleSearch').addEventListener('click', function () {
//   // var value = getElementById('valueInput').value;
//   // nguoiDungService.layDanhSachNguoiDung()
//   //   .then(function (result) {
//   //     console.log(result.data);
//   //   })
  
//   console.log(listUserServerSend);
  
// })

/**
 * Them nguoi dung
 */
function ThemNguoiDung() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDung = new NguoiDung(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    soDT,
    loaiNguoiDung
  );

  nguoiDungService
    .themNguoiDung(nguoiDung)
    .then(function (result) {
      getListUser();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getListUser() {
  nguoiDungService
    .layDanhSachNguoiDung()
    .then(function (result) {
      renderTable(result.data);
      setLocalStorage(result.data)
    })
    .catch(function (errors) {
      console.log(errors);
    });
}
// Xoa Nguoi Dung
function xoaNguoiDung(id) {
  nguoiDungService
    .xoaNguoiDung(id)
    .then(function (result) {
      alert('Xoa Thanh Cong')
      getListUser()
    })
    .catch(function (errors) {
      console.log(errors);
    });

}

function suaNguoiDung(id) {
  document.getElementsByClassName('modal-title')[0].innerHTML = "Sửa Người Dùng";
  var footer = `
        <button class="btn btn-primary" onclick="ketThucSuaNguoiDung(${id})">Sửa</button>
    `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  nguoiDungService
    .layThongTinNguoiDung(id)
    .then(function (result) {
      console.log(result.data);

      getEle("TaiKhoan").value = result.data.taiKhoan
      getEle("HoTen").value = result.data.hoTen
      getEle("MatKhau").value = result.data.matKhau
      getEle("Email").value = result.data.email
      getEle("SoDienThoai").value = result.data.soDT
      getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung
    })
}

function ketThucSuaNguoiDung(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDungCapNhat = new NguoiDung(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    soDT,
    loaiNguoiDung
  );

  nguoiDungService
    .suaNguoiDung(id, nguoiDungCapNhat)
    .then(function (result) {
      getListUser();
    })
    .catch(function (err) {
      console.log(err);
    });

}

function renderTable(mangNguoiDung) {
  var contentHTML = "";

  mangNguoiDung.map(function (item, index) {
    contentHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.taiKhoan}</td>
                    <td>${item.matKhau}</td>
                    <td>${item.hoTen}</td>
                    <td>${item.email}</td>
                    <td>${item.soDT}</td>
                    <td>${item.maLoaiNguoiDung}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onClick="suaNguoiDung(${item.id})">SUA</button>
                      <button class="btn btn-danger" onClick="xoaNguoiDung(${item.id})">XOA</button>
                    </td>
                </tr>
            `;
  });

  document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

function getEle(id) {
  return document.getElementById(id);
}
