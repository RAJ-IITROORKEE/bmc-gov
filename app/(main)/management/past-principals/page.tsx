import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { History, Trophy, CalendarClock } from "lucide-react";

const pastPrincipals = [
  { slNo: 1, name: "PROF. H.L. SAHA", years: "1972 - 1977" },
  { slNo: 2, name: "PROF. H.D. BANERJEE", years: "1977 - 1977" },
  { slNo: 3, name: "PROF. B.K. CHAKRABORTY", years: "1977 - 1978" },
  { slNo: 4, name: "PROF. M.M. GANGULY", years: "1978 - 1982" },
  { slNo: 5, name: "PROF. A.K. MUKHERJI", years: "1982 - 1986" },
  { slNo: 6, name: "PROF N.C. CHAKBRABORTY", years: "1986 - 1988" },
  { slNo: 7, name: "PROF. N.C. BAGCHI", years: "1988 - 1989" },
  { slNo: 8, name: "PROF C.C. SAHANA", years: "1989 - 1995" },
  { slNo: 9, name: "PROF.C .R MAITY", years: "1995 - 2001" },
  { slNo: 10, name: "PROF.B. MUKHARJEE", years: "2001 - 2001" },
  { slNo: 11, name: "PROF. U. GANGULY", years: "2005 - 2006" },
  { slNo: 12, name: "PROF P.K. GHOSH", years: "2006 - 2011" },
  { slNo: 13, name: "PROF.S.K. CHAUDHURI", years: "2011 - 2012" },
  { slNo: 14, name: "PROF.MANJUSHREE RAY", years: "2012 - 2015" },
  { slNo: 15, name: "PROF.SUKUMAR BASAK", years: "2015 - 2018" },
  { slNo: 16, name: "PROF.SUHRITA PAUL", years: "2018 - 2021" },
  { slNo: 17, name: "PROF.PRABIR SENGUPTA", years: "2021 - 2022" },
  { slNo: 18, name: "PROF.KAUSTAV NAYEK", years: "2022 - 2024" },
];

export default function PastPrincipalsPage() {
  const firstYear = pastPrincipals[0]?.years.split(" - ")[0] ?? "1972";
  const totalLeaders = pastPrincipals.length;

  return (
    <div className="min-h-screen">
      <section className="relative h-[340px] md:h-[420px] overflow-hidden">
        <Image
          src="https://bmcgov.com/uploads/past_director_banner/original/C2.jpg"
          alt="Past principals banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <div>
            <Badge className="mb-4 bg-white/15 text-white border border-white/30 hover:bg-white/15">
              Management Archive
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-3">Past Principals</h1>
            <p className="text-lg md:text-xl text-white/90">
              Legacy leadership of Burdwan Medical College
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-5 flex items-center gap-3">
                  <History className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Leadership Since</p>
                    <p className="text-xl font-semibold">{firstYear}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-5 flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Principals</p>
                    <p className="text-xl font-semibold">{totalLeaders}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-5 flex items-center gap-3">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Recorded Term</p>
                    <p className="text-xl font-semibold">2022 - 2024</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-primary/5">
                <CardTitle>Principal Leadership Register</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Sl.No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[180px]">Years Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastPrincipals.map((principal) => (
                      <TableRow key={principal.slNo} className="hover:bg-muted/40">
                        <TableCell className="font-medium">{principal.slNo}</TableCell>
                        <TableCell>{principal.name}</TableCell>
                        <TableCell>{principal.years}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
