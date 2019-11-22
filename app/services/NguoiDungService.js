function NguoiDungService() {
  this.layDanhSachNguoiDung = function() {
    return axios({
      method: "GET",
      url: "http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung"
    });
  };

  this.themNguoiDung = function(nguoiDung) {
    return axios({
      method: "POST",
      url: "http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung",
      data: nguoiDung
    });
  };

  this.xoaNguoiDung = function(id){
    return axios({
      method:"DELETE",
      url:`http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung/${id}`
    })
  }

  this.layThongTinNguoiDung=function(id){
    return axios({
      method:"GET",
      url:`http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung/${id}`,
    })
  }

  this.suaNguoiDung=function(id, nguoiDungCapNhat){
    return axios({
      method:"PUT",
      url:`http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung/${id}`,
      data: nguoiDungCapNhat
    })
  }

  this.timKiemNguoiDung=function(value, listUserServerSend){

    return listUserServerSend.filter(function(item){
      return  item.hoTen.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
  }

}
