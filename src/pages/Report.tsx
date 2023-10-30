
import ImageReport from './1.png'
import VulnerabilityTable from "../components/VulnSummary";
import AbbreviationTable from "../components/Abreviation";
import VulnerabilityDetailsTable from "../components/Example1";
import VulnerabilityCountTable from "../components/Count";
import VulnerabilitySeverityTable from "../components/Eval";
import QuyUoc from "../components/QuyUoc";
import PeopleTable from "../components/People";
import ScopeTable from "../components/Scope";
import { Card, CardMedia } from '@mui/material';
import { Target, TemplateInfo } from '../type';


export default function ReportView({ result, targets }: { result: TemplateInfo[], targets: Target[] }) {

    return (
        <>
            <ReportPDF result={result} targets={targets} />
        </>
    );
}

const ReportPDF = ({ result, targets }: { result: TemplateInfo[], targets: Target[] }) => {
    return (
        <div id="dvContainer">
            <h1>Báo cáo lỗ hổng bảo mật</h1>
            <h1>1. Thông tin liên hệ</h1>
            <PeopleTable />
            <h1>2. Mô tả chung</h1>
            <h2>2.1 Phạm vi đánh giá</h2>
            <p>Mục tiêu tiến hành đánh giá, kiểm thử bao gồm:</p>
            <ScopeTable targets={targets} />
            <h2>2.2 Phương pháp đánh giá</h2>
            <p>
                Dưới đây sẽ mô tả một chu kỳ về phương pháp đánh giá của pentester để đánh giá tổng thể cơ sở hạ tầng mạng, các hệ
                thống ứng dụng nội bộ của công ty dựa trên các phương pháp đánh giá NIST SP 800-115 Technical Guide to
                Information Security Testing and Assessment, OWASP Testing Guide (v4) và một số framework do phòng An toàn thông tin  tự xây
                dựng.
            </p>
            <p>Các giai đoạn trong việc kiểm thử xâm nhập</p>
            <ul>
                <li>Lên kế hoạch (Planning): Xác định phạm vi thực hiện, thu thập các mục đích và thông tin từ phía khách hàng
                </li>
                <li>Do thám (Discovery): thực hiện rà quét (scanning) và liệt kê (enumeration) để xác định những điểm yếu của
                    các đối tượng (hệ thống network, ứng dụng Web, ứng dụng mobile, mạng Wireless, Cloud) từ đó xác định các
                    cách khai thác phù hợp</li>
                <li>Tấn công (Attack): Khai thác các lỗ hổng dựa trên các điểm yếu tìm được trong bước do thám.
                </li>
                <li>Báo cáo (Reporting): Tổng hợp tất cả các lỗ hổng tìm được, cách khai thác các lỗ hổng đó, sau đó báo lại cho
                    khách hàng</li>
            </ul>
            <p>Sơ đồ dưới đây sẽ thể hiện trình tự thực hiện các bước trên:</p>

            <Card>
                <CardMedia
                    component="img"
                    image={ImageReport}
                    alt="Image Report"
                />
            </Card>

            <h2>2.3 Các yếu tố rủi ro. </h2>
            <p>Rủi ro được xác định dựa trên 2 yếu tố: khả năng xảy ra và hậu quả</p>
            <ul>
                <li>Khả năng xảy ra: đánh giá tiềm năng mà một lỗ hổng có thể được khai thác. Khả năng có thể xảy ra được đánh
                    giá dựa trên độ khó của tấn công, độ sẵn dùng của công cụ, kỹ năng chuyên môn của kẻ tấn công và môi trường
                    phía khách hàng.</li>
                <li>Hậu quả: đánh giá thiệt hại mà một lỗ hổng có thể gây ra cho hệ thống, ví dụ như: tính bí mật, tính toàn vẹn
                    và tính sẵn dùng của hệ thống và dữ liệu bên khách hàng, ngoài ra còn có những thiệt hại về danh tiếng và
                    tài chính</li>
            </ul>
            <h2>2.4 Thang điểm đánh giá</h2>
            <p>Sử dụng thang điểm đánh giá mức độ nghiêm trọng của lỗ hổng theo CVSS v3.0 (Common Vulnerability Scoring System
                v3.0):
            </p>
            <VulnerabilitySeverityTable />
            <p>Thông tin chi tiết về hệ thống đánh giá mức độ nghiêm trọng theo CVSS tham khảo tại:
                https://www.first.org/cvss/specification-document </p>

            <h1>3. Lỗ hổng và giải pháp khắc phục</h1>
            <h2>3.1 Quy ước</h2>
            <QuyUoc />

            <h2>3.2 Mô tả chung các lỗ hổng</h2>
            <VulnerabilityCountTable vulnerabilities={result} />

            <VulnerabilityTable />
            <h1>4. Báo cáo chi tiết các lỗ hổng</h1>
            <VulnerabilityDetailsTable vulnerabilities={result} />

            <h1>5 Chú Thích</h1>
            <AbbreviationTable />
        </div>
    )
}