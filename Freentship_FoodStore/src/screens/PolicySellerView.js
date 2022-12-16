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
const DATA1 = {
  space: "---------",
  answer: "Trả lời: ",
  Catequestion1: "I. CHÍNH SÁCH BÁN HÀNG TRÊN FREENTSHIP",
  que1: "1/ Phí kích hoạt tài khoản & vận hành gian hàng trên FreeNtShip từ ngày 01/06/2022: Hồ Chí Minh – Hà Nội – Cần Thơ – Quảng Ninh – Hải Phòng: 550,000. Đà Nẵng: 1,000,000. Các TP còn lại: phí đăng ký theo từng khu vực.(*Mức phí này đối tác có thể yêu cầu xuất hoá đơn VAT)",
  ans1: "2/ Mức chiết khấu tiêu chuẩn tại FreeNtShip là 27.5% (VAT) trên tổng giá trị đơn hàng đơn thành công.",
  que2: "3/ Quy trình thanh toán:",
  ans2: "Shipper đến sẽ không thanh toán tiền đơn hàng cho quán, doanh thu đơn hàng đã trừ chiết khấu sẽ được ghi nhận trên ví cửa hàng. Quán sẽ nhấn yêu cầu rút tiền khi đạt doanh thu tối thiểu, tiền sẽ về tài khoản Ngân hàng sau 24 tiếng. ",
  que3: "4/ Chính sách rút tiền trên FreeNtShip:",
  ans3: "Cửa hàng sẽ rút tiền về Tài Khoản Ngân Hàng đã cung cấp trên hệ thống của FreeNtShip khi đăng ký, sau khi lệnh yêu cầu rút tiền được duyệt, FreeNtShip sẽ chuyển số tiền được rút qua TKNH của cửa hàng. Từ ngày 15/08/2022, FreeNtShip tính phí rút tiền 5,500 trên mỗi giao dịch rút tiền về tài khoản của Cửa hàng đăng ký.",
  que4: "5/ Các Thành phố FreeNtShip hoạt động:",
  ans4: "FreeNtShip hiện tại đang hoạt động tại các TP lớn: Hồ Chí Minh, Hà Nội, Đà Nẵng, Cần Thơ, Biên Hoà, Vũng Tàu, Hải Phòng, Quảng Ninh, Quảng Nam, Huế, Khánh Hoà.",
  Catequestion2: "II. QUYỀN LỢI ĐỐI TÁC KHÁCH HÀNG",
  que5: "1. Đối tác sẽ được tạo một cửa hàng riêng để đăng bán sản phẩm và tiến hành giao dịch kinh doanh cũng như quản lý cửa hàng của mình trên Sàn giao dịch TMĐT FreeNtShip.vn.",
  ans5: "2. Đối tác được hỗ trợ hướng dẫn sử dụng các công cụ, các tính năng phục vụ cho việc mở cửa hàng, đăng sản phẩm, tiến hành giao dịch, sử dụng các dịch vụ tiện ích trên Sàn giao dịch TMĐT FreeNtShip.vn.",
  que6: "3. Tạo tài khoản chủ địa điểm và cung cấp quyền quản lý và giao dịch cho Đối tác trên Sàn giao dịch TMĐT FreeNtShip.vn",
  ans6: "4. Hưởng các chính sách ưu đãi khác của Sàn giao dịch TMĐT FreeNtShip.vn hay giới thiệu đối tác thứ ba trên Sàn giao dịch TMĐT FreeNtShip.vn. Các chính sách ưu đãi này sẽ gửi trực tiếp đến Đối tác. ",
  Catequestion3: "III. NGHĨA VỤ ĐỐI TÁC CỬA HÀNG",
  que7: "1. Đảm bảo giao đúng, đủ sản phẩm, dịch vụ như đã mô tả và cam kết với Người mua. Chịu trách nhiệm về tính chính xác, trung thực của thông tin về hàng hóa, dịch vụ của mình trên FreeNtShip và các đối tác của FreeNtShip.",
  ans7: "2. Thực hiện đúng việc thanh toán phí mở gian hàng và chiết khấu trên mỗi đơn hàng phát sinh trên Sàn giao dịch TMĐT FreeNtShip. ",
  que8: "3. Có trách nhiệm thông báo mỗi khi có thay đổi hoặc cập nhật về cửa hàng, sản phẩm hoặc dịch vụ.",
  ans8: "4. Cam kết thực hiện đúng các quy định về an toàn vệ sinh thực phẩm, hạn sử dụng sản phẩm (nếu có).",
  que9: "5. Tuân thủ mọi quy định của pháp luật Việt Nam hiện hành, đặc biệt là các quy định có liên quan về thanh toán, quảng cáo, khuyến mại. Hợp tác và cung cấp thông tin theo yêu cầu của FreeNtShip trong quá trình điều tra các trường hợp nghi ngờ phạm pháp, lừa đảo hoặc vi phạm các quy định của FreeNtShip.",
  ans9: "6. Tuân thủ các quy định chung của FreeNtShip và các quy định của từng chương trình hay sự kiện do FreeNtShip tổ chức cho người mua, người bán như: các chương trình thúc đẩy bán hàng, mã giảm giá, Lopoint,…",
  que10:
    "7. Không truyền tải bất kỳ thông tin nào thuộc quyền sở hữu của FreeNtShip hay sử dụng dịch vụ của FreeNtShip hoặc sử dụng dịch vụ của Đối tác thông qua FreeNtShip vào những mục đích sau: bất hợp pháp, không hợp lý, lừa đảo, đe doạ, tạo đơn hàng giả, thăm dò thông tin bất hợp pháp, phá hoại, tạo ra và/hoặc phát tán virus gây hư hại tới hệ thống/cấu hình.",
  ans10:
    "8. Không thay đổi, chỉnh sửa, gán ghép, copy, truyền bá, phân phối, cung cấp và tạo những công cụ tương tự của dịch vụ do FreeNtShip cung cấp cho một bên thứ ba nếu không được sự đồng ý của FreeNtShip.vn.",
  que11:
    "9. Luôn duy trì thái độ nghiêm chỉnh, đúng mức và phối hợp chặt chẽ trong mọi hoạt động phát sinh trên tinh thần hợp tác, cùng phát triển.",
  ans11:
    "10. Đối tác không thực hiện đúng các nghĩa vụ sẽ áp dụng xử lý được quy định của Chính sách này.",
  Catequestion4: "IV. QUY ĐINH MỞ CỬA HÀNG",
  que12:
    "1. Các thông tin đăng ký (thông tin liên hệ cửa hàng và người đại diện đại diện) được yêu cầu phải đầy đủ, thống nhất với nhau, không vi phạm các quy định về đăng tin nói chung.",
  ans12:
    "2. Thông tin đăng ký phải trung thực, rõ ràng, không gây nhầm lẫn hoặc hiểu lầm đối với người xem về uy tín bán hàng cũng như các thông tin nhận biết khác của cửa hàng.",
  que13: "3. Địa chỉ cửa hàng phải đầy đủ, cụ thể, chính xác",
  ans13:
    "4. Số điện thoại di động và email đăng ký cần phải chính xác. Mỗi số điện thoại di động, email và tài khoản trên FreeNtShip chỉ được sử dụng cho một cửa hàng.",
  que14:
    "5. Hình ảnh logo cửa hàng đăng lên phải là hình ảnh logo chính thức của cửa hàng hoặc là logo sản phẩm mà cửa hàng được quyền phân phối, không sử dụng logo được bảo hộ hoặc có bản quyền, không sử dụng những hình ảnh đại diện phản cảm, hình ảnh cá nhân không được phép, vi phạm thuần phong mỹ tục, văn hóa và pháp luật Việt Nam.",
  ans14:
    "6. Người bán vi phạm các quy định mở cửa hàng sẽ áp dụng các quy định để xử lý",
  que15:
    "7. Trong vòng 30 ngày, nếu sản phẩm không được cập nhật hệ thống sẽ tự động chuyển sang tình trạng hết hàng, tắt hiển thị trên FreeNtShip.vn mà không cần thông báo trước.",
};
export default function PolicySellerView({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Chính sách người bán",
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
        <Text className="font-bold text-2xl">Chính sách người bán</Text>
      </View>
      <View className="border border-[#DDDDDD] m-2">
        <View className="m-2">
          <View className="">
            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl">{DATA1.Catequestion1}</Text>
              <Text className="text-lg">{DATA1.que1}</Text>
              <Text className="text-lg">{DATA1.ans1}</Text>
              <Text className="text-lg">{DATA1.que2}</Text>
              <Text className="text-lg">{DATA1.ans2}</Text>
              <Text className="text-lg">{DATA1.que3}</Text>
              <Text className="text-lg">{DATA1.ans3}</Text>
              <Text className="text-lg">{DATA1.que4}</Text>
              <Text className="text-lg">{DATA1.ans4}</Text>
            </View>
            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl ">{DATA1.Catequestion2}</Text>
              <Text className="text-lg">{DATA1.que5}</Text>
              <Text className="text-lg">{DATA1.ans5}</Text>
              <Text className="text-lg">{DATA1.que6}</Text>
              <Text className="text-lg">{DATA1.ans6}</Text>
            </View>
            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl">{DATA1.Catequestion3}</Text>
              <Text className="text-lg">{DATA1.que7}</Text>
              <Text className="text-lg">{DATA1.ans7}</Text>
              <Text className="text-lg">{DATA1.que8}</Text>
              <Text className="text-lg">{DATA1.ans8}</Text>
              <Text className="text-lg">{DATA1.que9}</Text>
              <Text className="text-lg">{DATA1.ans9}</Text>
              <Text className="text-lg">{DATA1.que10}</Text>
              <Text className="text-lg">{DATA1.ans10}</Text>
            </View>
            <View className="border-b border-[#FFF1F1] pb-2">
              <Text className="font-bold text-xl">{DATA1.Catequestion4}</Text>
              <Text className="text-lg">{DATA1.que11}</Text>
              <Text className="text-lg">{DATA1.ans11}</Text>
              <Text className="text-lg">{DATA1.que12}</Text>
              <Text className="text-lg">{DATA1.ans12}</Text>
              <Text className="text-lg">{DATA1.que13}</Text>
              <Text className="text-lg">{DATA1.ans13}</Text>
              <Text className="text-lg">{DATA1.que14}</Text>
              <Text className="text-lg">{DATA1.ans14}</Text>
              <Text className="text-lg">{DATA1.que15}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
