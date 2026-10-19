import { sequelize } from "../config/database.js";
import News from "../model/news.js";

const initialNewsList = [
  {
    title: "กระทรวงศึกษาธิการเปิดตัวแพลตฟอร์ม AI เพื่อการเรียนรู้ของนักเรียนทั่วประเทศ",
    reporter: "กิตติศักดิ์ พัฒนาวิทย์",
    category: "การศึกษา",
    publishedDate: "2026-03-10",
    description: "โครงการพัฒนาทักษะดิจิทัลที่มุ่งเน้นให้นักเรียนมัธยมได้เรียนรู้ปัญญาประดิษฐ์เชิงประยุกต์พร้อมระบบติวเตอร์อัจฉริยะแบบปรับตามรายบุคคล เพื่อเสริมสร้างความพร้อมสู่การทำงานในอนาคต",
    status: true,
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=JMLsHI8aV0g",
  },
  {
    title: "นักวิจัยเผยความก้าวหน้าเทคโนโลยีควอนตัมคอมพิวติงด้านความปลอดภัยไซเบอร์",
    reporter: "ดร.สมชาย นวัตกร",
    category: "เทคโนโลยี",
    publishedDate: "2026-03-15",
    description: "รายงานการทดสอบระบบเข้ารหัสแบบ Post-Quantum Cryptography เพื่อเตรียมพร้อมรับมือภัยคุกคามในระบบการเงินและข้อมูลลับขององค์กรธุรกิจขนาดใหญ่",
    status: true,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=JhHMJCUmq28",
  },
  {
    title: "โครงการสร้างพื้นที่สีเขียวในชุมชนเมืองเพื่อสุขภาวะและสิ่งแวดล้อมที่ยั่งยืน",
    reporter: "วาสนา รักษ์ถิ่น",
    category: "สังคม",
    publishedDate: "2026-03-20",
    description: "เครือข่ายภาคประชาชนร่วมมือกับชุมชนฟื้นฟูพื้นที่รกร้างให้กลายเป็นสวนสุขภาพและศูนย์การเรียนรู้ชุมชนเพื่อคนทุกวัย พร้อมติดตั้งระบบพลังงานแสงอาทิตย์",
    status: true,
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=gQqom5_wFls",
  },
  {
    title: "มหาวิทยาลัยชั้นนำเปิดตัวหลักสูตร Micro-credentials สะสมหน่วยกิตรองรับตลาดงานใหม่",
    reporter: "กิตติศักดิ์ พัฒนาวิทย์",
    category: "การศึกษา",
    publishedDate: "2026-03-25",
    description: "หลักสูตรสะสมหน่วยกิตระยะสั้นตอบโจทย์อุตสาหกรรม ผู้เรียนสามารถเทียบโอนหน่วยกิตและรับใบรับรองมาตรฐานวิชาชีพได้รวดเร็ว เหมาะสำหรับผู้ที่ต้องการ Upskill และ Reskill",
    status: false,
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    videoUrl: null,
  },
  {
    title: "ยานยนต์พลังงานไฮโดรเจนสะอาดต้นแบบพร้อมเข้าสู่สายการผลิตเชิงพาณิชย์",
    reporter: "ดร.สมชาย นวัตกร",
    category: "เทคโนโลยี",
    publishedDate: "2026-04-01",
    description: "เปิดตัวต้นแบบสถานีเติมเชื้อเพลิงไฮโดรเจนสะอาดที่ผลิตจากพลังงานแสงอาทิตย์ 100% เตรียมขยายโครงข่ายรองรับการขนส่งสาธารณะในเมืองหลวง",
    status: true,
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80",
    videoUrl: null,
  },
  {
    title: "แนวทางรับมือสังคมสูงวัยด้วยระบบสวัสดิการชุมชนและเครือข่ายจิตอาสา",
    reporter: "วาสนา รักษ์ถิ่น",
    category: "สังคม",
    publishedDate: "2026-04-05",
    description: "บทวิเคราะห์การจัดตั้งศูนย์ดูแลผู้สูงอายุระหว่างวันโดยอาสาสมัครสาธารณสุขและเทคโนโลยีการแพทย์ทางไกล เพื่อช่วยลดภาระค่าใช้จ่ายของครอบครัว",
    status: true,
    imageUrl: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop&q=80",
    videoUrl: null,
  },
  {
    title: "งานวิจัยพบการอ่านหนังสือแบบรูปเล่มช่วยเพิ่มสมาธิในเด็กได้ดีกว่าการอ่านผ่านหน้าจอ",
    reporter: "ปิยะมาศ ธรรมนูญ",
    category: "การศึกษา",
    publishedDate: "2026-04-08",
    description: "ผลสำรวจพฤติกรรมการอ่านของเด็กวัย 7-12 ปี พบว่าการอ่านผ่านกระดาษช่วยส่งเสริมความจำระยะยาวและทักษะการคิดวิเคราะห์อย่างมีนัยสำคัญ",
    status: true,
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    videoUrl: null,
  },
  {
    title: "ชิปประมวลผลขนาด 1 นาโนเมตรรุ่นแรกผ่านการทดสอบประหยัดพลังงานสำเร็จ",
    reporter: "ณัฐพล ดิจิทัล",
    category: "เทคโนโลยี",
    publishedDate: "2026-04-12",
    description: "นวัตกรรมเซมิคอนดักเตอร์รุ่นล่าสุดช่วยประหยัดพลังงานลง 40% และเพิ่มประสิทธิภาพการประมวลผลโมเดลภาษาขนาดใหญ่บนอุปกรณ์พกพา",
    status: false,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    videoUrl: null,
  },
  {
    title: "รณรงค์ลดขยะพลาสติกแบบใช้ครั้งเดียวทิ้งในตลาดสดและร้านค้าชุมชน",
    reporter: "วาสนา รักษ์ถิ่น",
    category: "สังคม",
    publishedDate: "2026-04-15",
    description: "โครงการความร่วมมือร้านค้าสีเขียวมอบส่วนลดแก่ผู้บริโภคที่นำภาชนะมาเอง พร้อมการจัดเก็บขยะอินทรีย์ไปแปรรูปเป็นปุ๋ยชีวภาพสำหรับเกษตรกร",
    status: true,
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80",
    videoUrl: null,
  },
  {
    title: "การประชุมวิชาการนานาชาติว่าด้วยการศึกษายุคโลกเสมือนและเมตาเวิร์ส",
    reporter: "กิตติศักดิ์ พัฒนาวิทย์",
    category: "การศึกษา",
    publishedDate: "2026-04-18",
    description: "สรุปประเด็นสำคัญจากการประชุมเรื่องการใช้ห้องปฏิบัติการจำลองเสมือนจริงในการสอนแพทยศาสตร์และวิศวกรรมศาสตร์ทางไกล",
    status: false,
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80",
    videoUrl: null,
  },
];

const runSeed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("🔄 ซิงค์โครงสร้างตาราง news พร้อมฟิลด์ videoUrl เรียบร้อยแล้ว");

    await News.bulkCreate(initialNewsList);
    console.log(`✅ Seed ข้อมูลข่าวสารพร้อม videoUrl สำเร็จทั้งหมด ${initialNewsList.length} รายการ`);
    process.exit(0);
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการ Seed ข้อมูล:", error);
    process.exit(1);
  }
};

runSeed();
