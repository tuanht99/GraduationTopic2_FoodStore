import {
  doc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
  QuerySnapshot,
  editDoc,
  onSnapshot,
} from "firebase/firestore";

import * as ImagePicker from "expo-image-picker";

import { db } from "../services/config";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "firebase/storage";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { GetAllCate, GetCategoriesByIds } from "../services/store";
import { Link } from "@react-navigation/native";
const DATA1 = {
  space: "---------",
  answer: "Trả lời: ",
  Catequestion1: "1. PHÍ ĐĂNG KÝ TRÊN FREENTSHIP LÀ BAO NHIÊU?",
  que1: "*Hỏi: Đăng ký gian hàng trên FreeNtShip được miễn phí không?",
  ans1: "FreeNtShip có thu phí đăng ký mở tài khoản & cửa hàng từ ngày 01/06/2022. Tuỳ vào khu vực, mức thu phí sẽ khác nhau : Hồ Chí Minh - Hà Nội - Cần Thơ - Quảng Ninh - Hải Phòng: 550,000. Đà Nẵng: 1,000,000. Các TP còn lại: Phí đăng ký theo từng khu vực.(*Mức phí này đối tác có thể yêu cầu xuấy hóa đơn VAT)",
  que2: "*Hỏi: Phí hoa hồng khi đăng ký trên FreeNtShip là bao nhiêu?",
  ans2: "Mức chiết khấu tiêu chuẩn tại FreeNtShip là 27.5% (VAT) trên tổng giá trị đơn hàng đơn thành công.Trong đó 10% VAT FreeNtShip sẽ giúp cửa hàng đóng phí theo đúng quy định của Nhà Nước.",
  que3: "*Hỏi: Vì sao cửa hàng tôi cần phải đóng 10% Thuế VAT.",
  ans3: "Dựa trên chi phí đầu vào của đối tác cửa hàng trên FreeNtShip là mức hoa hồng cần phải được kê khai Thuế GTGT theo Thông tư 219/2013/TT-BTC hướng dẫn Luật thuế giá trị gia tăng và Nghị định 209/2013/NĐ-CP. Thông tư tại: https://thuvienphapluat.vn/van-ban/Thue-Phi-Le-Phi/Thong-tu-219-2013-TT-BTC-huong-dan-Luat-thue-gia-tri-gia-tang-va-Nghi-dinh-209-2013-ND-CP-220761.aspx",
  que4: "*Hỏi: Vì sao thuế VAT được Nhà Nước giảm còn 8%, nhưng FreeNtShip đang thu là 10%?",
  ans4: "FreeNtShip cung cấp dịch vụ theo ngành nghề kinh doanh đăng ký: mã 63110 – Dịch vụ xử lý dữ liệu, cho thuê và các hoạt động liên quan, thuộc Phụ lục III của nghị định 15. Vì vậy, thuế VAT không được giảm.",
  Catequestion2: "2. ? ĐĂNG KÝ ĐỐI TÁC FREENTSHIP ?",
  que5: "*Hỏi: Tôi muốn đăng ký bán hàng trên FreeNtShip phải làm thế nào?",
  ans5: "Anh chị có thể đến văn phòng của FreeNtShip để có thể đăng ký trực tiếp hoặc đăng ký trực tuyến qua đường dẫn – Địa chỉ văn phòng các thành phố đăng ký trực tiếp Văn phòng Hồ Chí Minh: Lầu 4, toà nhà Lữ Gia, 70 Lữ Gia, Phường 15, Quận 11, TP.HCM Văn phòng Hà Nội:  Tầng 8, tòa nhà Vietcom, số 18 Nguyễn Chí Thanh, Phường Ngọc Khánh, Quận Ba Đình – Văn phòng Đà Nẵng: Tầng 5, Toà nhà Đức Mạnh, 255 -257 Hùng Vương, Q. Thanh Khê, Tp. Đà Nẵng. Văn phòng Cần Thơ: Lầu 2, toà nhà Hồng Phúc, 28-33 Phạm Ngọc Thạch, phường Cái Khế, quận Ninh Kiều, thành phố Cần Thơ Hotline hỗ trợ cửa hàng: – Hồ Chí Minh: 1900.636.075 – Đà Nẵng: 0898.311.023 – Hà Nội: 02.473.078.778 – nhánh 205 -> 210– Cần Thơ: 0907.564.328 Group Đồng hành cùng chủ cửa hàng FreeNtShip Hotline tư vấn cung cấp nguyên vật liệu Losupply: 1900.638.058. Fanpage tư vấn hỗ trợ mua hàng Losupply: https://www.facebook.com/FreeNtShipVN/inbox/ – Đăng ký thông tin trực tuyến: https://doitacFreeNtShip.lozi.vn/",
  que6: "*Hỏi: Tôi đã đăng ký cửa hàng trên FreeNtShip nhưng không tìm thấy tên quán?",
  ans6: "Anh chị liên hệ số hotline 1900.636.075 để được hỗ trợ xử lý",
  que7: "*Hỏi: Tôi đã đăng ký thông tin trên FreeNtShip nhưng không thấy ai liên hệ để tư vấn?",
  ans7: "Anh chị vui lòng liên hệ số hotline 1900.636.075 hoặc qua email nhatphuong@lozi.vn để được hỗ trợ nhanh nhất",
  que8: "*Hỏi: Mình đăng ký trên website nhưng bị lỗi cần đươc hỗ trợ kịp thời",
  ans8: "Anh chị vui lòng liên hệ số hotline 1900.636.075 hoặc qua email nhatphuong@lozi.vn để được hỗ trợ xử lý.",
  que9: "*Hỏi: Tôi muốn gửi đền bù cho khách hàng khi xảy ra sự cố về món qua đâu?",
  ans9: "Anh chị có thể soạn tên cửa hàng và chuyển khoản theo các thông tin tài khoản Momo sau: Số tài khoản: 0969.045.871 – NGUYEN HONG TRUNG, FreeNtShip sẽ hỗ trợ anh chị trao đổi với khách hàng để hài lòng nhất.",
  Catequestion3: "3. CHỈNH SỬA THÔNG TIN CẦN THIẾT",
  que10:
    "*Hỏi: Tôi muốn chỉnh sửa thông tin quán (địa chỉ, số điện thoại) trên FreeNtShip?",
  ans10:
    "Cách 1: Anh chị có thể vào ứng dụng FreeNtShip chủ cửa hàng, chọn mục Cửa hàng – Sửa địa chỉ ngay phần Thông tin cửa hàng Cách 2: Anh vào quanly.lozi.vn , chọn mục Sửa thông tin tại phần Địa chỉ",
  que11:
    "*Hỏi: Quán tôi muốn thay đổi ảnh đại diện trên FreeNtShip thì phải làm thế nào?",
  ans11:
    "Anh vào quanly.lozi.vn , chọn mục Sửa thông tin tại phần Địa chỉ, chọn thay đổi ảnh đại diện của quán",
  que12: "*Hỏi: Tôi cần điều chỉnh giờ hoạt động của quán",
  ans12:
    "Anh chị vào trang quanly.lozi.vn , chọn mục Sửa thông tin chọn thay đổi giờ hoạt động",
  que13: "*Hỏi: Tôi cần hỗ trợ chỉnh sửa menu của quán mình trên FreeNtShip?",
  ans13:
    "Cách 1: Anh chị vào ứng dụng FreeNtShip chủ cửa hàng, tại mục cửa hàng chọn. Xem thêm tại video Cách 2: Truy cập vào FreeNtShip.vn, vào cửa cửa hàng đang quản lý, chọn Quản lý menu để chỉnh sửa",
  Catequestion4: "4. LÀM SAO BÁN ĐƯỢC HÀNG TRÊN FREENTSHIP?",
  que14:
    "*Hỏi: Hiện tại FreeNtShip đang có những chương trình nào để hỗ trợ quán tăng đơn hàng không?",
  ans14:
    "FreeNtShip có những chương trình giúp cho quán có thể bán hàng và tăng doanh thu mỗi ngày",
  Catequestion5: "5. HỖ TRỢ ĐƠN HÀNG",
  que15: "*Hỏi: Cửa hàng nhận đơn từ FreeNtShip nhưng lại bị huỷ",
  ans15:
    "Anh chị vui lòng liên hệ số hotline 1900.636.075 và cung cấp cho bộ phận chăm sóc cửa hàng mã đơn hàng để được xử lý",
  que16:
    "*Hỏi: Quán nhân đơn hàng, nhưng lâu quá vẫn chưa thấy tài xế FreeNtShip qua lấy hàng?",
  ans16:
    "Anh chị vui lòng nhấn yêu cầu hỗ trợ khẩn cấp từ đơn hàng để được bộ phận hỗ trợ xử lý hoặc anh chị liên hệ số hotline 1900.636.075 để được hỗ trợ kịp thời",
};
export default function QuestionCustomer({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Câu hỏi thường gặp",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

  return (
    <ScrollView className="bg-white">
      <View></View>
      <View className="flex justify-center items-center p-5">
        <Text className="font-bold text-2xl">Câu hỏi thường gặp</Text>
      </View>
      <View className="border border-[#DDDDDD] m-2 rounded-lg">
        <View className="m-2 rounded-lg">
          <View className="">
            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl">{DATA1.Catequestion1}</Text>
              <Text className="text-lg">{DATA1.que1}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans1}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que2}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans2}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que3}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans3}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que4}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans4}</Text>
            </View>

            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl ">{DATA1.Catequestion2}</Text>
              <Text className="text-lg">{DATA1.que5}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans5}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que5}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans5}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que6}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans6}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que7}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans7}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que8}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans8}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que9}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans9}</Text>
            </View>

            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl">{DATA1.Catequestion3}</Text>
              <Text className="text-lg">{DATA1.que10}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans10}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que11}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans11}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que12}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans12}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que13}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans13}</Text>
            </View>
            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl">{DATA1.Catequestion4}</Text>
              <Text className="text-lg">{DATA1.que14}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans14}</Text>
            </View>
            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl">{DATA1.Catequestion5}</Text>
              <Text className="text-lg">{DATA1.que15}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans15}</Text>
              <Text>{DATA1.space}</Text>
              <Text className="text-lg">{DATA1.que16}</Text>
              <Text className="text-lg">{DATA1.answer}</Text>
              <Text className="text-lg">{DATA1.ans16}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
