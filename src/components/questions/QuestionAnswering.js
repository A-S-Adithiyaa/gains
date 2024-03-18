import React, { Component } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { CgAddR } from "react-icons/cg";
import "../notes/notes.css";

const userIcons = {
  user1: "images/bot.png",
  user2:
    "data:image/webp;base64,UklGRlxCAABXRUJQVlA4TE9CAAAvz8KzEPUKJLdtBEmS///rTiWpnpnda0RMAH9a1Xf4dpr3UCWJ+EbA1DwvUKcJkDWL9HEbspEAMlapw7lI4mas06V0lWOrOaPBOZxfxoTOIok0BywkcbhCf9Cv7Ca5FvpLGV5KEsLBHGcASYBsTpLDmSSUGwrZB1CaajYpkwcDZpwLB0k4L9hDJX26SaTfYBpIYtlA5aKM1T1ZcctyALKr7PoErCtl3SZH5WLjzOWX1fJPl45r264jZ/4j7pAAn+Gv++47975uSe/Le+8i79pHlRI68uIACDBqk1Us1/ZCilDMSBL0HoNRunZ5Fm3xYEGy27Z5DzBBEoIgzaSqly/d9v8rstxI9SbzFvNUuvZc8e3cMd0yM10yGYaZwexyk6ZrrHMiv2tFRGYdB/z3zrz6dwnGISzhNuWypnVMIa5owWpDCrcZ5ArR393lNIaZvU2hVoQEAADLRvo1nXW2bdu2bb5t2/7T27ZtnG3b/tvtuC1tZUG2W7fNBSCAeDFp61qmZDux/YWP2j5FcluZxCyzBWZMjGFmZjaEOWZ2mDmmMDMzMzMzg9mWmVFreX1Od81Md03Xb8b/xkGlc1Nnw2T785XuOKfDDG04G6WyURjrXimbnAmz0nH23HX8RYm4/78r2rZj5rwXLxNVa6hG0JKv9bIzp/+Y/mP6j+k/pv+Y/mP6j+k/pv+Y/uM5FwEJ5PQUwob1chMSYBxBCxrDkS8yoaA0FPQydEzp9yDhBGlDeekpLjl6eoKJMkooXofKdfcUedd9tPgikPkL4GjXHsVXfXxwGfArKqTxpiGtvPjARg4NHPEnhJWc/AanyOIBBTfeSAXdGf9wZjH91sXsgn9TnreY+d49T9y04N3EGE2U8I9CiijmNbnf4BjHWUskgVihhgJSK7+RNAx5uxA2c7XDmLRM/5GMZIcX4aRziGv8oeLKxdRiAaJiWuCL+ZsYoeYpPnGdC1t8cEXrLatneSEIYZNWu/RP/BdoqONJ2hO8ufHBNx/O2QoCP8SAGcxEOXUHWNdl2JThR6Ap/3q6c+UvrZtsJX3jzVTynRzW4I0e8si+lLJcOqaw4YrluVoiOKjixlJy+UrrYtaWCKy48JQuNwuiYsqI4pLVlb7maGVaCDIekzTxkTO3YYvsAUMLGjdWqb8HGcvXBhfQxpcN3CSf/qXabQb7risuPY2g4hLVr7qqWPynk2+cJwXjcm7+PW+aYkPp3/H9OLJq/iLzVqJY/JuPuyZSLM8CbgX1X7yTTQSi9p/IpZ2eTVEoLMWue9vxU/dZQVMGD2B3gMdd86lUagXBp5EsvJDWIrTx2eUJaSitnaBIFMffxNTSlcG0urYdqYgmy4lRvnDw/CWSG55dnjCORSfEcGQnv+GVrg76bmVu61K3lhNDvH33cy9ASm3DJsZT9L2A/jk+MmA5AYtYyyl2fRFCSC2XiUZ247IXH14IhsJzP1FcpPqMmcWVsfaHOsuJcV6SfL+W225Q9m6Qu4aXP7Kcuu7sThaKUw80M8Z4w2GCkCs7NiEe2DiwnudMmNnuCLc5hWl7H6+u+V7ZseHw4Pdtesp9l2NSOfqpcPCadBSKpZa0iUAqeb787SvNbO5P75Gs7X28/PolkqX0DcQqyuW3c7nwTP20K5OcDvo4gnp5ps3C/g1a7KdrtUdaxxM8+/rmYKbw39FiFYUkXjJb9shMZ5dmOpRWDcPvQdZ5LP1P+pfAN3n45uKG51E8cMd0GSc/veanh7E4JYQ1VK1cRRHfwSK/WI9S8ecZ1veFFHxuvs9sexSP1DP1xUw3XLGepxf/dR5Iff3G0+/fOCB9b7bl521Il5ZZ1u3eGHLuMrO4lO8Wh5kxePxk6f+Kddr6GB8Q5PkH2M5JlBFd7rjtXvy/tia3ToMqLFKL3v3Znbso9mZGC3uRL7VefzPgspGOI932dFDrrRmjnMKo1Hq9tdDh0JVmwHMLwoU0dWYs8LrUOqyvFsrkXVtaSXElxb2ZfYZlL6Wsp0bKrXs4zYTZ6Q+mO6/1ZEY1Sf+RrDqENdNKqj9+73vMTru77szWXyTtFH29TAiDKmbk3rpsOdjIE2hmO+LroxHyPmhz78xqy80JtF3/UlZurIVH1FWR4yjTy5bhxt7sByyHoiGtfZME/Q22naaP7Q6/TGxxE2bdm4RkGswQlSwfGHzFYZ0zLuRV6PLi6BnOvkW65R2ua9sN0tx6Jzu+Wxy18QrqdgZ+xRvXsmXwlPQvgA8/m3t3vkHH3WzMcfrmImHt8uJJfqnKR6gzu/WDl6uO65UXdZ5ai6v2PWXKuHHiHWtAO0tfgOTONerADUm/btv2nrw3SZEwq3A1pPh3PneuS1XY8aHVk0ya9LLPP+oUhrKvQBhZJFg0nG+4RFJTWoe8v8GZMza1dBJl2eFjTRPTHnyJq3y23TGUVjYUpyDMMtVFo5Vg1fHC2uPFngqbW+eNKh1Hmy967hXAzM959Rt4sb2Vjk7J4GR5lbzom5hoSOuNFxoHz1gmapM3lnAMvtSQWPTZzh+KDH6Oa97AA21mB5NLR0rp1YnxKhkGZkyz5yJEQdcZL86UtadnnIlbWSyGHrbPGU6/xxSqtM33/Je/znXd2SNl1Pgx0aI1Qz5dp2NYV2TB5Pje9rFtuQvNN2hDPmjPmG7Rb0db4VFGFvoQm9nC9nZlWWZw8WyZ4u3dusbe6CVEdVxPzuDD8TGbM6y1sR0+Ta4a+Qynm+c5gDz33qdpI029ktTeMeujz/RiV/ih30r8Efzf4vNqWv5TohVOriK2hhx4H1TZXfQUwKMOcA9LDIYXQXyBCnK8y7zEtW7wPl5qY6PsbC9NdaPeGRkxTUYTbqrrxWS/BwmKDM/z5ZT2xKpwbWrB8BFQPiJ8WiIepeL7HnjYM74nMkwyc7Cdgb3hgKHDejEbyXTnPdsdy2xZycgrRJrHFq/0mqNETvHKH21TyjtwNC9iivZJjNaIyQZFgbeNXk6JNnyCBUbsRP2oKPpspIWSdIKrewolu3kRx70xeU0+2bowG+502n5qecwx+92qVrS8FaxiNWu7lhv7yjUc8+bw1XRKuMj5koiTvo2Y2UPzyLh5SmItyBr1BImDe9u3vm8LbgAVJPBXQ3zP7WHS4m/kNVSPYRERaD/FSVPw/zQ0Pmfz1Pq9m/2QU9B7o5ykqqtOUopAFn59SvEMDYvojUVW+P60KSne9DVytthSXNaIPDmilLic+NOEy6dpnnOzcfkk1etbjKps2FsngWUzbqTXSJs21c1enPcrkZlp9Uvi3vi7UPH4YzqDosSbBqZFEyvIN8qlQzFJigAGvE7SvCpTvb0DZ18/1S8kJYIh62L7rSzI93hThg5d0jTwfOXXYS7DPJ09zr6LEB39PI29Zvv2L3AHOfZye2eKwJdESYER16PkMiti2hk/H9LBw9Ng88C2U+stF7inWXTgK3wpyevpfMMXM8wTe2OEgHzB0LcFkw83az0lolnrTi478KWqL6mRJ/5c1CTalulcr4Dg1z2I5b/1rbdcEP8Qcw5y5IkWD+Q3FnhN80xb40Ju+nQPtpp1DbIa6tOdKuB9nnQpgAcjjcsQO+OkavJmuZzbNl0oshq6rRJhrAHSwOAPF3hNi3B74+pLKTp6smBARd6jd4utyOsGOorcDAHuizpFUYgfZsoK6sU98GM079F6IXd1Mw00Um8IBYq7M1F7owdH/+WQ9KrZuvZ7Mj7LbAHkyHNjFE/Gpnmezpgl1XdnTKrk2nZqkNUy2v+WvJpBOuhmaGlc9qmYN/wuxGt7/Hcm9/IeTbEal/eH3CyX+wLrDIyBOhmX/gzQ5LGCBqW234kgLzQgQmeYGb8dZjTPk+Gd8ep/sb2VQfXJO6wXwKLjXhYYOPMEKwxfykBPbxT8gpSOnirYNmTK0MDLRK8wDw88QGgM9PT2/1D0Uh4V35usE0EsnwboPcS8qMWHxkTP3ujAXAcPfcRSMhDaJILXkWeL1MRw3vB4czgQEz2dMfkTfS3ZO5e72WnzJEIVMz4cYKRD91ScY2iM9HQGDwcF9UzhlE1RBIuWexsRRW6k+BQ4Ikg2Ve/DxycLQlCybC+EMOODKdZQD044NGZ6JgOyWofgjfZFyJ25NMLS058bK8D6AkzVrbFZx+CL0a9a3wSvmvqLBdZcUiwxNIZ6ItCu0hT8MMo1QYSteKlKurnBPjuCgRirk3HeB83fjiTlXv0SoakcpR3eaPBjdtFc3RuH8gL/s7/aANGFH8NsPB6lykS0llLQ9yq4ZX0DLFX1azTa5egV6wiiqy2tOzmX8xopllsa1HC6sWgarp1xJWefkzvrltDHLwXOaPoHHogZTdaM6I0sf+MwiiOWbwDTGbxfLHW0oGejPZ1x2dc4gCpHpLFbqSeXNjvQo3riMaP12N+Cg3LY9rKkWb5pKtpy4wU4zfeyabZ3b2Rr8DAGKHusOxZFmPEOkLfnEujw20pE4lwvc+baMfiXzTrroiziyFMM9kkKgC9wmhkzo/W4N87q4F02HntgFMUibZkK1xJEnqEzXOPeSPUsToo+E3OGCSNscunh8TBS6HmSzmzd7knzKg7pFIsaiE4aybiLgdGZiwEuOlSTPXHeEqajTx2/4b710ogjl4fci4EHrtR0nbbM4+ZPPCpZ1tdqae2/DyVdEn2wYOBGK9AYQV3/DvCl7my2/XE7VYw1oJFLItMP89Bs7YxaZDT5kRA676M4wla8YGHwaHyTznA9gEbhq2gp+FAUo/tq7B6ayz3MPggLY46bxmtvX/CgO8qksBCjzrr6LNXl3UEacmBdbJqea28f18F/Tn7ihfUCieVWBg2dNGbo4CBGwzUCZ4J19J0kDtQoynETyKUR9Nw33sWMhus0M4GG3/CgROYdBBI6HoRUHPodEf8Okk3XA8wofy09eExO0l99ep5kktGGlYe8aEOvGwmCpmtnPDhB8pcGIVxBtXUSCS23UJJbnMw3GXSM17548AR/8fHM9iIJx+CbZWKGWHQmgMa9EeIrPCprrRfJCmfV00eR5yKZWwgyG6/TzDh6+reAnyShDX+KIgktHyauNf08eubrAWaPwfWRn6QmpIuZlFgnk5BcplA298ADBZnN19544iOPPzbU9oBiNMLuZraBlUkKXGCACMpePfeHsqkuMYPNQSxSnDITJ60CzJ9bj96IgOcZYJQqarkJyVgomUmgkzG0oS98kqLBgE21SC+4D8kYfHdBRgk0g8Zrr3CF8ccUWieW0PEKw5ywHLcWJAihrPcJHpTj1ksm/BRSwXiJABE0Ane3+EPOqLjv91EsoeXGwjAuuQkp2J01Bj+qnpATApJ05kmS4f4ko4FLDLPI4OmMb38MAIIn6E9JlkRmXLmSAsvxY63ohGC3t+d19ANhaT1nP92MjnpOPkwB1rGZMChFHhax8QFO4WbGtpNgNi27Z4npisaLBUih54zKk3T3u8KovK3FF11hM0WAYILbCpEjDwd0cL+PffVIX3ghiEaKawsQQ+P0Bow1uV6wr+X4enSGu5GOKwuQQyej/BdZyemukH6O8Uu16M86wy0hl421BAiinX1VR7drLtfk6ww3KFtKAz8IkEQR2VMu51EJqkdu9obvI5WNVQRIotNMDwx3u343ki7h0DFPNcjv3X2sWjpWFyCKdsYudzf896hyzrpa7O6wQtlIcU3SECfmsNDkah+uMzAj6qhoHw6VDY9bCJElyqi/mOlmV0gn6dTZtJMQlysaHniOAGG0Nw662TXW5GslLls40i0ECKNxYgZDTS4WnPZdrEG8Y+Ax9CgB0ug5I39wryuMiTI7V720FCsXjRRLdXQhaAKywb2L30nZU4cvthSrFI5LVwqaxInaMnFzSs49X6SO51GObcWqhat2fRtBWCDdG1k6ulbzpwY9x7YO1i4cmwgQSOPEIpY6uvYAO7B6OcTmtuLqJSNFr18NkEg7ewyaS0tCgkytTTWczNdaXLts9G4ONTDbXapGZVMdvrm9uBl4yZi6NzqKpGe3TCITkjuTnrt2GyuXNuNekHvBmCPpSKGiuORMFVLiZ/WaWZvxVIBknKJcxOkMNq7kUUm1fQ2+NmMjklHgEsMUsQz/xhQc+QQANZxtTbPZwuBy4YEHCBBMSXCjGpU11fucM5udzV8yZrqrALF0mmmB7kKV0v+RZbhyHRfROc9ZrkEVWCZbkXJpZ6x0oRqVbOvq8PVdHItUrvD9hVYyQz8S7lNJMfg6WKxVXLEhQQOz3lGAbIaj7lMp8LtyHQBwzfBihS+UgUimcQsP5ZBc5zvIzH3i4gkAL1X4vkIrnOGmjo6zka6+5mb/cNzTnJEKRb9boxXPIMDYbTzq98T1kWzF5QpFitMmnXRRnfHKaUjhEiWm5igvLK9YqgTcEDNKx26yW1zGo3K2eg0CdyJTgseQWwrD8pnnNDlMHyrDq1rHTRB4BaEyYuUMREKDr7vUqOTWoEFgGx0S4Ut+5Y+E5pqUnKUzlWsr1yDgyFOVKGOBc6e5ot0Q7So1Kqeq1zjkLwLhgfugFZKZZughuAi/H9FnGK1a/44C1nGFMvFAbGEdZYwiXQcX4X+jypaqdaBARr7GsDJFL3k8SSciM+XJRZsTpPB30c/Mk8DaNnnwhkcEZPoRVou+0X8Fi7mIUTu8XBQeFc8ZTOCkJvkUkxE6TAKco4zezp4LDmqS9MvWSVyzg+vtUbDDylMPnPEoIiZvDe8wukdjvhdYW25rLFDIdlUA+Lujk9DwXpN7wC3bS3xE8t7KOGR7/phCK59ub8NKR9f4UGS64s4woq9TdcJ5fyshnfHCNeq/ocpG6+QVRx4/UvHwuDsJd7cfx8fRcUxJ+Pj77QBryRQKr1JWOpBjeSIOJBMZx90yHJVA28obZ8arEdD1PHMsuIWEGmfGb9bfgzglwudqx4GjfoZoQDoa8/VpeLSXhMnXK6hLNBYIY5QXljsbEFMhnhm2V+XSAIaq3Qvb/w5Q7tkBFPh0PsvtpNOcuXwM3o5XEZHdnAkxOkFK7vChxuwcRUa3x4zlo+HxLxkrrPZ2vzuSB2V7xXEg2EEn2sUj98AryUiGGYOIqytcIVAoNXYxYLAbR0JeLQRht7HMFcljOLTq52OBhY77GBmphBQbkZL5qZDccffbficx2IoXKiOz7A6QUDN8zgQYqBM4KPJMWBRZaHm1EpLiBJW61xid2e2G4aAszeNS41YE3M+eN7B0OlJEnSBohBLc0JUvs9x4ORm55DAso9kaXjq6QDBGUHk2lAHbBAymWE2AkNobd12AUbkgdbayNbxYAfG4JTmJ9gRK8p8MFRTOZTZVKmhkxQLWuwZ+aTohfX4pg/zZJNi0ExuWh0PA8EKDPuVkvuYiJDjg7uQ1ZUPZA6R4ndUzo5jEHcIf6guB9ILyRyyKLWQrLhOFdG7q6wRhOfUA2uelHw6lBxcTHFa5S2DChS+VoQiaQHGQfRjCSfqz1WYjwg7SCoDau6mkGueP/lCT7J2JMGDlGk7QM0chm+19R7Ky66V/Zs+kPJ57yYXM+ByFaKbAZbMpa3Ay2qCq4K6gPyvJWLXZoLghQDLX+XolVtKB4CK5+s9oILLyRW9MTYuWLArvVqywQc7pIHmE+3Mnvs54L4INBKc7Gh2F1cmo/mMgSD5+T8VjWMVZCmV8j2jbBDNKS9whelLu4iEQZcBKBVfxWkL14gusOPRLoTZuTTDqFVWPcZnHyhRVYO7qS8gbpCgFscfPM2LRDeBBAt1zDnjg8ZR+BA5mAvSkHg76HpsqFWiys/chzQFBfEVHCtwFZRG950sIg9TjC3PvBrDJJ+oZRa99t4vBiCf/qW4sn3RSwyOhV76DnuRcZlOVgk6eav5AkXoxKosUwGmOpmYSOYEhuCpy+IVAsZvnKjU+2d03AciQiFCmrLZF6BdbCZZZDcp6692BsHz5Zb5y4OAS6PTx5wkTN5WFqWLTGzdkRlI+WgbdISWz7UZOFqYnIkh9AWUyBE7wDs2QNWA+kpZFl4DOWvKuYLai0TNwdXTq9e/l1rjrMdCEuE5mpRolu7ipAQ1njmOxwGbZfet19UCT8m6uEkC5QsOZ7xQcQ0fxOW88EzgQFC4DFt0Dy5cyOggcZ1HmIgCyB42R5/VTvCVW29lB2pGLR2owA/8eS2c5ET0z4fKqIZBWaQSqXKbBIB22gSdgi1pAb5zSc7wfPLLeRbB8OoOD6H+2GJ8FKTVAO+O3uIOgyN9n0U0bXqHBpB7rUYZSCxIYR1JaHpUQm9on9t30lgJz7wptLQhGeR+BelCOzVWO0fIiYXBvd6a42pDAAWkDSflRaSbaYmNDmmpSfIQKtSGBb5qEjSBbZSTw8pzRMFM9rlxxNSLhPqRlDYxKaLURuMWG4QW4AG0N2NVOtI6yRjhrvcOwhQKGsswwXCu0N67KGghKvnXOApt8NiOTCwy7K8XWjIRrRB38HkRRgVdpBLEcBngD4+5A8deOBPgoa5I0ct7Adg6DIw80jwKnThnRaYjXUdgXtcxlYMaXMc549DpB3SVZQxK4rIOo51y3NmLWraryFZ8FXb1ddSQobAYqjYAuHskwU+BSgrjaQoYZfbDk5KQY9VUCNu8B+ERh0t0xeINgiLWF3Txjqy8EcmYSbcBKx6ibVgNv0Ol7cT2hv8YoIrtDQZ12FAfw0hy3YJgDltiiBnEA7YKchSFRZAeY88bMeD/G5PH442uoQ7Smg0pBqy9RXPCrjQBvOtwULXB9gbMH0e5DRsrEUXG1WOEYu1w6YMgzJ/xw2I9FBX5SDgf9JdtXCPBy/kYArJayiuyp7g5SgpPWVyrQfdxJo/CJd0N/ncxqEp29Tc7BF1wJWm5uRBRJT+3xmRhKbQrQeZIqJQcqbHIk6PhsgE94H3fHVq5GabSFUMiHgwyK9OGkRVeCTT7E1EQrer470tUwQ4SMiS8GekWljzBmAR8rwV6PtoejIjUrI3tkTHwlqsRb51BxTPBPp/HAugN/TYM7MqL0dgO5VLfgHSP3SWXhR9HWss45o0DGlFG561ZYvkQBn1T7UOGr1jCNcj7BFqVVVhpRHZ/QYwpSzDKIq3EAMZSwMOjvQKh3LkZOLIutdewm+5yOIt4pht7qEFZg9onlxGsevYy/O0jSjy7mLFYG3xnc7UBwSUKMitM87xyLKYnlgZjDadwZfyRMGYpXGce1GJtYfhPhPExGJ2QNAoIV7sWwieUHs+sQLeOjqknCd5qkQtzuO/i0AxF/KCLIsUzki5u3L3DXYQcU8UyopLy3blMy2PXGJvkKgyaabKpMnIHh6znI0lE+/EcGXe7FiInlIbkH1Aj35ENSlBa86g7jxEPcd/Bp9+GcUahBPqC7EFn0xc0PZudhMppfiGoQD5jb7niDAlrlw6j42XbnWoxcvxGNMaTE+0VYBiXZMrhJwfRDTeKB1RD9zi8HjmtqmImHUTlaIbbes+799s+6D9FwFO/B1AflWqUb/zlvpPbR2Yd1EG/DQxejjgv0dpN4CEp+dYcl4yG2AdgcQOO6jtJJoK7Kw+wedF5fLYT78iFlTRViE1DWGc/lw39nZj3V4QA/xNfYde+w4zbGJUWTOYvu3dRx0eeMfxrEewpPs4zYoAwme/AvAOH4hUA/U+FjTm/9B8PXRGi/XjiAKknW7TYom2jZ4OXigTQXY/g6Ljpatoi2Jul+7d4KEd2BmSeWn+wroMZp3M2YanLGZnIGWr0pscy4Re1jtzMsxAPbra9s7JCU8XVdx74jHADKtQrhEPfiE3rhlh7Ve75d+xKw1lG8J7k471hwDN5SMq+s5YE7r3DVlt9vGhUKP/HwbSdunK1k1oDcJ9GtvfLnD611NQh8xMMN1W1iFBnqzBzp9oIVCXRrqhy3K6oRtSaAnXjgTnWbOAld3wyHNErFqK0tEUicW10F5/gSpzl5mQ/RrbxNV1v4jHh4xs67C5nSyiR39nQrXTJukpUSv3eqSNoFls+0ouPJI5Del/si21PbBqSrHQEChUNQflnnKLdVF5x3HT4eQOUmr+O4lxNPVKLHiX6PGSvwJRzviAjk4Am31kL9hHI1ApxlQwiBMpscBKfG7OGHXz9bBNLzH4tFVtyotnyZoeET5IbdGB0r8Tac+jHdvkAg87/g63mhprJoW/nZGg7CQdOiwUFQj3fYwX1d4JwRSJ+zX/LkAseQruLANrXAxPQA/Og1Irwr/geD9qq0OcUUocx7na+nThRX3w4o6AvRW2xySpmzyhfPJ1vjmQ8MAPnBXxr5SyfYfx5pF4vj1DNMiAK/21GUN8WvoUDpH6ROPYC2M73BI7ajNvLAOjY66H8j01rh3bwkhFP638ldTEAoadH+6+98pO/Gr5GiLcouQ0d7wonoocApR3tPPP0KO/N9miOQAZf9XFQjBOdz0uEl6IPVYdrKV++CIf3wsPP9I4Ai9T7PUSIN/Jx0kVqpykwT0EMBHEHLKJxj5copXukdb/7mi5VOJqEHhIt0+CuAxspgwqHkGOH7+bPav69YpSPqHTN3fKaZVz8Kva+XdJFoq1zZqlxTPHzPXSnl4cycyGAvHV6EVrjZRukO1rza51fyMQA+TX2eV+aQaLDJD54siir7l7qJyJWtJpRWHozW+9QfLP3Yl3BK4aG4yFcGumiRPsWpZYI7ub+vAaHPR/7vsCpREj8356pqgfFbYhaV78SoDFtS0oLjvhNSiRAWbMTDorW6RqKd4PQKlztzAAj611+F1HITc61iDx7jX4VZ5M6xSOOMsE+VwU64hmdzaoSczIaVvhBINxAcapEgJ97DWafKtnqcxSGN3gnHZjMLrJ5iweHum8hoeJYE6j6ej6zhOUpKWmBuF4OZJtnwlwANUsMpMXt7kH9/xKvFKNX7SRyO3fOskhaYvBU63Sd/iljS8p21vwzV3nFCNuaPyOeNuBYu6G9b/zjvEcsVo7QDx+CmZg1frVvkk2k/mdmRV1ry/1z7v5RJ0GVwhOCBLp4U735ePKnuvD6wQ0yO+izs74g19hlWnDu42/s8ry50fKKpqIq7LtJpOTmftt6X+pcvU6kCKF3OTICOdKjygzgUt0J4XNDfaA90nrME4BvKSjXXx5nEa3+dFHivnpNNao5Y+AofaTehZz+icTDxFg3S3c+rSohxut5G7uozAAaf65SGzrn+ROPBJu8ImrUArod0STr5k//Sv8//mHBq/qlDeSXrxNrNvuiCKh64UeH9Fm+XYU2w4+q/o1Q9beu3ASQHR94M9CYCayNdok7WjsbAU4+9/HOeOTDoKp9HXbadUCw6XkMVD9yW8n7lyopye1884w8Cyv+jUIftE/MTqRx5b2M1ejzabod0Cbv4AAL575P8a0c4Ap+60kd4ub2QQXaRgCIeyLNePji1UPDhvjIVwCwX+7Y3ocwCkhSUkRrlM0i1ufwfOt7GHLWfLMcreVBSHI4/rlWtpS3QeU1zuOI3xpo/1u47bG3qyr8UzmVpkRYeqMIpk5ZcjjOM9Hf6esCBpEvkyZ986bfSNPSc6d3+Uy0SFQYa/gIQDyyt8mk823y/8Ne4sgYQ/kT5kmFXgf/SgKM9V0DTq/7otWgZnzdVt4KV90rEyl7PnOp/wjdcXjiQItrj9DrluPA7+sPbGtW+aS0pjjM+ynjdYQOpDne5GZuMz64S0NbtUg/kR6/kocYq2eW4rhYPdHQHWpq/lasbukx9varypRAJuV3Ax3en7HT8GGPLTcGXfL2obu/Kt9MnYCBdVgq4q6OAv4CvSHBK/t090IF9ArnS/B6rzWdCRORGA43rDhq7v0xTC8AqPljdoyLLb8K/bQ2Pw8Tv37HjxJVeCBQr21WG9i1xP9fKxysFDQk6Zb+M3Go89cqz2smohZdB0T+Sc84n4D13tqOE1/6z40xgQRSDBVbd82rd3q77bGWPdtalVZySwaDZFkLyjliK8HgxSz08A3S1fUKNdaXetKovqyWHpmdhqXxAJxNYrGrTpr31Pd3T2c8aibpvSR65tke6ZMmLjqHA+e9E197ZLj4GfPWbYVCEw9LP9NBR1DNLGg3x+jJUvLdkMxNWh/b03t66Rg7zFz5Zp2l8pngvQsq8lsjqMZFsUtfieNvJO7W1kr37HH+pZjf6d3eM4v3U0fAEgcvCY7auYfZAAltgJx6MXVr/Llnuox1tOF/qvCkil1x6LY3EZc/P9y4mKGXhhrrdLN6LcBf0H1Fpr7Cwi5X2nuBcvbL3MXkrVVynxmpclrs6JJIXwJv1jXtG/iyZ14Yp2Qn/gSdTMphps4X8tGvx3s8dqoRAFsTvafJ8yxRxJw71xHm6pMk3fQCI4D73fDrXCbQjhyTToxSGH33du0hYBltuIRjFIiDM/wK3vmRlaz2xjxQvvKGXGpXXVdHr8Snd/0UECf43T42Z9glgvnczhbQGQsd/Iwv4cwzyUoAn8nSOfMcxkYoFdTk+Gq3eD6kLrOD1+Mxu2KWRLj5FkoFPi9QDw17lm8LBOMOg4rcgGlTlu6NXy2EzchuHlcmfXL1lttC7Yt/R0fBlx3roV2NGrTwBcp/0mzSSA/P+jfKZWlf8jBRVUGWb9a0euLDg7S6+GvqS3x5DnN7JUenp9mJD+3PUy+Mhz5En3eOBFW7NuN2SXJIQRBuwzcjILaxtzkjkWjTamSD1wjMu800yxcj7oNXMY2HwIWHEP6Qd9Edn+3xBpEGwVUFVPDemiHYZ3lq4IH49HTDi7x6nWKpmLPlz+DLMl9p5EIwf1gBynwMYO5GkM+avnpIp4c+F/giDrS10Lci/n3wQk3p5bi+4I2+hQuCGtH+qXDVmPHCACZ5gMN9b2fNUXSnoQpSO8kGpqRAKW78RMYcAP4rDkffjK2TBO3WP9jliagMm3bbMiUHlWTNunoFhqUnlG/LBusqgTl/tMKAw584sNLppdX6ZeKeyfJfXdweqEbdgzBBG3fBXfI7MjNgtechDQcTfE4Rj7Sx05DJ1xPa5JhQdec2VF/ACuLdAxWp8mwWw0kCNOKp80FDAR35ypVa8drVs0CDdgDYybulUoywGBfANfer42VJn0mriXFvQGQCVJ0gCYlScbG4hHB8HSORtRo196mlNrmupgI82q16FrjF3zOaO1MB7unXStnpKuVjFYRwRX3/JjG+xdXDcxYjosx1mrTk7tqHH2HAXe3pwgWinfnyAQPWFjWP4dhzIZtWQPqtd+QpHmppSKL6UBDBuS+CptODIOwFmObnAwq1r7jxQbXvZuyuHnYzev8tm4ou979ZBJWS+ty8wBm8FeTdy0/Q+2EKL/3oA35Ei8rL4f6TVwbdMDPupbfjMHuiSzWzYKoiqgIlcbF2h42ifwfBzNo0UN6eBVuQhgM+BGOUXj0Q2YzOZd4ce8w6b+58uVknnkj2swynkhASr27Zx5PkCbb2aRgPnSA2ys3fGP+9H+9V/Qkfnp2Y2Sb60QPdEJprJqA96guQjL0rVvpS9JIA8LRDI8rszjf8FEkDn4zGLvZo4XWOb2B/+PEpVVPZdp0qqEhaimS1abNnw3NXtWvN0ffFZMXqNX9Yz8uC4cO4n7ujvbHzJdO1xoCU36ZLcJ+cVVEVMgU5nuwotN2dom91LsXTSxeTSMfjMY4KOE50jLjIuXfwNYHQrV+nS37Hn+d4G5WfbAqtAnpvJKcbnhfrWUN2jgfwlaOMGLtvg+5TfwJUyS/CdyCn/jD8iJr6xVYWWr9UObygL11Bq/Tg6or93lIZv2b8Nwuaaj7EKQUFlAbUTS5KQYHvLfrPkZaMwdR7r3hRt7AE93ZCI6077ixrWE5vpxnQNfkqLeBHaBB9UDk2DqoiFBNtUXSH0hzwOfJ4ZY+sR/cZaygv8P+niD/WRYDB+/jjfwCQ2ha+axHwFrZlqUWHGQ9A9Q2MTDiJdfL0NxFCPmetohDWOyw/D5hqEJrF9kqODqpCJ/KswUccdsOsuzC11OIpWw3S5ASD6eA//TzodE/YYhY67LzkwSYW1YmLQ4/Yk7ot/M3grIC9w7nrmscd7X0RPgUHfgE0dE/ZJ1AnbcWO6GdpksjU8FSAmKn2NljU8AodCuGdu5Ui/xGgARzHTMmVXjSLPTQ7OEbdDW+PvG5iOimOM+oD+0md5tI2mo+MyTpwj/AKr/X7Y1LOi+JXRYY83nSkOSmxOfuUiphsF+BbbslkrCgEbRZnj9VXGo89H0fbB9zHDmbxMfIbMkpnCGUlfiMmXUtryWAmOzeM2ei5DG/7CTAct+GVU1BS/1XZMzCsZnoLuCcA76ZLZIUVQjMqVhiSK9yUNbfksd0KnhWeJwqkH6LEHojD+GYJgptvRmsxmh7iw42iebF73ucm0D4qj2KWFZ0JemQ8p6Nopabi0ezwMu5LomEZek6CvjCCmC9HcksT/R2p2ocNU3AytFo6KwlJ18VQQgE5cyf5cEk8xRsULEFFfBmAksrFWJFpu602Gz2XT7xtnTy09c13w1blSM50IT5bad+LME3sPciTlxF/rWoAmbw0w/iF7/LFDh8miPI5Fj343Qqsl5cSRmk+Kme9MXwKFtykX9jPW3Dd/6LiH7wgwl2Ftek4mcN5RwHPp4Q4gQwdPoRHhCyCT9ZNFaNvmw4owl6X44/Zo41ueZGXSdi1f7hy7Fq044xMKrJ1OXw9NUDSIGkCSMYst2CxdhAfMhY/Ex3Jzle81H/r+Kq5Jw7zZxaeBCOQFjtNqU8k6X8R9Idr5XWVT6E+9FAWWXpXKABh8eCxXAxmvAoUUD0roX7qChr3rYoNyqvkBy+20wxvvGv3ir62YxWYDqDxjznTByiEEWp4zvBQPZuq2Ekc0XHUUFS9DizdQsfl4JQjAJ4YHXkbDPHYQ0ooMe7I46fhYbqwhQzjP0/BcDtp6GICjQdy3Qr3xgYx3Ap8bT8d3PoFbi9vJOHa+UThNjOhiMwY3AIjyrJ2VReVHEZE1cBFCiR1gdSuNx1sbvqddQw0Qy4mAzytGLxR4qtjnYyopjpEi4fHiPWU99xcRYQPHTQ9YIZ4HIUJ5hJi04DNEIe2A0gp5xWxgUh5nui1U9cy46CguSGp6wIVHxEgxj836LbTxloe7QP+dqLz8aTjvXpOXiSKXAz+KDkPJHjpP0VMP2I5MNZu1WBfrr2AvQPZ1x+VG8MEoJ131OSazK96E3YvSXH3kCL4KbY1/kl0h8Me6ZmMPg4pBiotkFo9DIl600ONR4mF5Z0FYDnLcR8I6RBSAW2VnswOWmwlmMzH4GhmPy8av02g8HLvi73WVQxpYHl2SKo0whZw+QPzmwi3w2GzcnyTMeA+0MReI7iKPxLdi4dg1bHwL5zBibPHYgsAuaYdFr51tMDd5qSgE2aj9U5ygI3+Azkik+Buthgd+JEnC69AmKIWT5a5wnXk+NzjguI+5CvItrcDpx1lpWm6pAz7ipsOaYs6Zq0dRyPJkLTegA+mLOwXcQbo1GJaTRfmWppwRMgYvgMhcGrM40/X1ZhtaURLOOTm5zxr9sDVA/kARfoObWmEa32qB0wxMdG4IPo/IecYrBV028lwU24ljm8wSE+ZmoSEL75urHPnzMCyJifEcHBzPP+oUSlGQWYxSo4YwFn3HP2cPRev4nyDJjEFZZX1zMdrw0vBQHCNWs3fVf52MjLcNaTodwBeTwmT0QNMg9AbzBZwzoqFs+WHA56IETzfyMmG5i5lGxeOrwSFicZ7tcJrLIu3Aw9EmJcxlocca9IBRvISNzeSMq8WQouCBm2WmvxX0Yq2RO1b5nXfCttE1Sg8t+PssfACbCUceN+bvIctcdsJRTQseEZ00+GoXVZsitdRijxF3QZuMI2IYyKvFBmFN3Vjurk/MGwK1zpDItaB89HHNNxd5XHf2GTUszZR9qWTQG7cKLfUQMYYsVsh62d4085EhzWx2nRHX8c3wIK8Yc+ZrRaTJ6w9yS8Qd0yYjTEDIIbbi9tw1FFsCDhaGFIuMFrT86pxj8XK0Ea1I7fApT3EYXSL6pvckXYPg7/M7oZUOxQ8O1ynNqhO4uhgHC8fg2aLVhBqDtxb4IeF/GF0pWZ+5WYzlHi7EGK50KIrbE2jF6VE8C23E2tNxRvWB2BVjHxWiakewJycJYYKPDKCPRKOJyLhi9CjRcx3/ChmFVcWZQimunDbSqH5UGTKkjhukq7o7a7fCEXysOlY8JPhXTdmjM8qfrXC8WHT4GHWLvkIXJbdy3XuhgsfZjKoUHZq8Qks+fB2bATtbIYSXSoq03rwFZhG4QHQizozp6CJM1F3NMrSYinSUiEGSDY5uIXmx9U3EugCh1pukq8w5xwl44IhICdeNijnBbIxb9XTq/hNF+A8CxRAeNmDzho7nX5oizUCiNDKLLOaVODzuiTZCNe0cXi7eyK5qh+X/IDcHzbiMVDqU3iOTRJn9DiKsOE8/FilWWvGDxDm+HYVgrY7i0dhV5fBcfhmqhB9y1RBVqSSfBIJQDQsBD0RXyWYLjkUD5xsh+g064AXjjqrNZNRACRfEx4eA8bhGxKoqJ5SZ7bYqGMsJgNe5pe/4agsMMgnG20lX5ZaJwx4F9ZCPeJSVrKlZeFxVBfbDa4ePWVJRebm7fMUv11RtbIK2mhzPPSaaHPAx2yEZAtg4rEWumS1VjjAvz6FxQaUfklLmqvdyZXwJ2mraA8wNn/Wo34OU3u/3ZrGL9KfAZDnCvIKcK1KdjVAs4yjSteMW3Oj+suq2vCRWF2MHDHk9VzqUWyopl3aUXXVafmKOsTvPwK4ID3pMtIQLrWr62R2jpRfJwAFD4iCmXZPYcjv9w+eC6QVo/b9XHjdVYcNhfYAXjmP3RlvF3K74VGwG/W9Mum2qCUIe1LfsAJ1luJ24NMILopSt0/prFOI16p3NVZE4M4f2crb4jTlkXZOU5bXItvIscChb6WvTv2n5E+A0eXGBXzzeSFvFdJ6UxAkB1D8yx0bhCpDKNq/Nusw9Wct4iXHxOLiTtsz2W98B4ukXqwjYjHs+dgXzoWHJFygbeY63llvXn3188AIlGR25IqUf6TJeRwWEXxdFGiGH4Ai8QUkwYHOGY5BLFg+sW43K6BaJNI+rnyyhqTw3SwFZK231wqwvd3ZCcvg5Bm0NauK4l2FDsHXP8o+0ahXqIWOT4lpp1bjdzDboR0BWWB7KetOPRFk7IpltFSfraco94MybpCs9/N3H5rLVjXzHDQZxEvKr8vtd7X4vkJMiw/9dbApbPhrEIw2/XWZKLSgdXGDJ1ttrDQkvIAUO3g1tlSw85JzyweD7O0C52RzllMP65Ct++ECTTin29nlsFpuF2/d0Jy6iy73HXVWJ3rjmms8FHzYzWEY0gx3t0WoKukFukFnAmpFqOHh3Ii0zXnkYJ2FnYPyBtio2brEowSUunlrXFHx17hKuQVN8psks46p1gFdR/nD3wpGKCNrxszIJtr/4jKNiuo+7RrDljsLfEiahOZTNFrxcLTwBM7XqgJAGbwvQ73YRiH2hHaP4PHfVcgxGgYh4DPpjkmeLVMMIrpgZecrKS8jY4x/3UQ26mfKKp8B58vMNwVNJuQrFwA+wvwfSUQExxZz3QP4CyIXEo8eSixlQuM5S52jVAJWKqlWcg7x8LqPgj2c6cy2LB7CiF/h2nDhQe5/W7qaZHtj5xj0qC4IANgPrRJpLqQA0jV6/il9OXV8V6IydZe2a8L8gU2hNUK14oXLivcbl7QQUjXBHqn77HqQLbVCBXxPCjmMXHFBrBJ616IR8q2fNCcK3BijLbQ0Mn9fzkuKDO6PVben8t8yUa5MKXMG3u7rZsjOv8/HAVrRjxBbapiLwZ+7qx/OhvgfTB56E+9YcR0FI6iiAKpFVN+EirBt5Xtcz6JAYN2mKZovXKm3Q/76pnqea2fJPSOt7ZjwirlIvnfFdy9qobuINWDtWWu/zppHxC61k+HaPtb4QuAshQH6XdbWyIw+q9xl8eFyhVrryZyzJZQqPecqIOrEv7mIyfH1Px2xxsTqJM3Oo59luY17Wqyzb83qfxsD496RxOi238rjjgBGCbayRLR8MdT65nyHmPUmfxu3daObadcxN62rF1aLI8zpf0eeuJ03RZzmexx2HFFDlf52qVfgjkOp/sHVtnJ3f8+PXVxuyV8i62HJ3Mz1AwD1qozM25tp5CAkJBucMqw9bC3PW+1LgH7qYZlpP0osToByo2FCfsvw7DgCQ4kIn7VdrBSgXqlfSnrWpaq7gtgJ3AICjx+nRzsgvfTBunagIrV6xxPrQc90PCvx5kh6m0uNMu5J5WAMXuN4DALT3ioueNKYeyztniqaAEhPbszXh6lHU/znbNUXH6TasluEnJSxzHZQDAtGLbqlD98Yth4qGBJna+QCrnBWWj+mi7o8GJuvYMRm3TGQqIc92qLqvBnWkesdX+s7reFWfPETvwMtqAGisyrVDcSH9ccC3OlxjsDky5jtLX7/LDL83+7me4AeWPiLWHJ/O+JXG4FJoUjSZ3J6tw/UDpKjrxafdHUMCNxmbjFhR41QX6XW4LB/vq4BvNAqgaHR3Fj5Ni0aj3edpmgPI00B8EYhPixy5MhY+DaWIMhYp+UU5vVUm/9bVYhpSHlntrSK9Ov/c709XswyzhPbZbKmkV2SdR3rrlHKv5HHa5pvnUmR99ee3Tn8u56kyaadiWhL3X6VpLCLl+Z019zwcrRy5z9K/erWcB3/+WZ2vi1MH8oH/2IHP/WdK7Cxduca1fIHv9TTczUa2NMp2ttW5hbSzY0dTOzu31r2Njo6Ozq10d7c3Aun+RDACoXQGQ2oEY9MdjkIo7ZsLx6KzZCw6G+3J72qRxY4M81RS7rdTpDtpotIEpqyK9OrMEjzczhLNpu/O4ZCnk6d/p5iKfGoquWYTc/iwmBX5rPrw8OjnCu/cqUXK08oyqE5S4tW/fs5S+CvNmMoc/3lH+lV2d6oj0lBH79HhkM2aygwqp6qSrDoCWx0VoWx5s9ve694P3O6uJ02aFPuJ5zBxXbnGsS4Mmd1mePXcZF0ukyrKkePiX6SFveWnOHSuizX1NLR1uEwpL+PGTRmn42mnn2Kl4GDo3wSBslq4DpcjtUsEIsRTc5+TFV7zPlbPB4DYG8ea7IN4T2qr5+HRyah6FW0MjkZISNFgU/UYnraJBUwa7oN3V8SvndYcF+XR5b5R3U2Dst72Nbh8rxIR/yc7BYcjAAJvDVgDDwyOuxlv/dtAXU5JX6fA2Haqgcel3BtnVvnMDsiKWlwcFycKXkkbg+MR0kUohdbVwYPitH0zGuWOjnehy+R8di1hNmkjpjiC4wFMwBaY4TVgRLSzT6wW00dFlvV1qPHQaaZzIbY8l/NzPklDPTmjoXFv+JY7eoHrrvwU7PWC2caJs6vF+VM9ZftaeDCcHvoX5KW5PCHnnnpyOBJtwWjxsmn5A8L4xwCfrKuFh0G/vV97Lx+9Iect+ftbsi4wC7Q6rTtH+GBWUwMOgbXrjKKLmaWTJ3xYV1MOR0AnY2DF8XVX+BSf49962P+a4cDbHsh9/mAKt3zeJt9ntkFvbFg+vu4On++fAcZ62P3KzTYK0PtFut/5PLNZBBgpqLcw52pjx+tkDK3s4JAAfxTw2zpvZ7aKsMdjVQeXBLhYib66GtDpetwZy1YlOSXAXUx7OrMR9saJwvYcJqS25vS49sZdHYLnQF9LLn1qGusid2tnlP4iKyX1HZwgDcoFQ+jZzFacZobRWu1zTHDlkWcz2S76AyeW/BdU1Yc4/TyDr14dZDP09v68ux9R0kMO5TUy3axnjCuro97THO1bbaqPnax7O/z+N9AxqEfxXUxtvZjZjp1ReEosNFRMOwXeWB87WCejH1nNJ/QrZmutTO9q3H4JpyLJt5i11tXJzlWgkelfopAGZbf1C8JjmW2VLcWEPsZctzN1smuVjYXtY5ygPVSvSa9q+dP36GeU9OVc/ljnpcym3BsHCvE2vpF/NTNdqvfoGLwNOupb6Kib3am9caEkPsc/vLVupiut2Bs3S+J3jHn97EkF2pOacvE9xoyRnH3RYGPd2rUavE9UB8XyPb7IbK8/WGF7X/C/9uJCvUjbDWTqQfNPBULvWbvps2IPHwMhdJ7aZz8k9aTc2gT2nTK50XpcV1/K5633N2ZzHkBjDOsdtg+DYUBrE5g+s3a9Pe2fsq6/rKhS1Qimw6zd3s5fXRZ3mq+So6IZTHdpb/w+JVtUuFQulnrIuuhXTA1EaLx/Dc1TRTXpvyCTZ7ERTEdZsTce/S9KcQ9yX+WgLAXmb0eFJxlUwWmyb/9m4LGiGkYlmnnrdj5kUAc7M7ZrSOq1NCgO9ObtvcegGn3610535pNTw6P2lO2j3xjUwjNGGfql9UH/5QMGl22eqMVwjBV74+eCe3px6xiVtcD804/jFINqOG2N+7BOtz7o2/D4fD5v0RzDGktP/M2tu0bp3fBo8ce66B0GFbG3N282i+9pOUnlUtGiQYYvrOO90fQr9RheDsH6fZ7lDwY18QCf7DokVoujQ3ysyGqUA3uLrhhP6Kr+vvY6lOaR2bRzv0Fl7O1p4k4sSUldzlGVdObyrKaR8da0NSox1DGop1NI+iht1sfGGWBb9LmR+85VaT73QoEPVpzp52QHFbK3hwldudrtdq87mLb9rolkb8su7o2CS6tM8+y62D+kojgxyqkO6uQ5M26fouugawAN+k4eWsnpxhDVsrcvsen1SfP3Mh0yGS+eJbGxDhOtaWvUP3qkI+uOHy0aN5t1OZwWomJmeF+sp5w+zf0jI+PuYgncWQ7q5mT2U/yKtLWCUlJMKLRp2jWd2u3RHBMBBxfM06+nrAeTQb7HioM6jnFQP6doP33gCOeJDMPIiKBnqaUjUtkD496MrLxnVV6Pr+p3sfwNt5XXwMVPZS+c5rznEbyDMbK7+LXsFLuUHTH2duaeVT2HpXHk0LuX1sDFLWV37MyoOn3PQQmJ6e1mfRkytmOnnCb79R9cQl/Rc81xKmuYsblbCYEuVOyeMffyFDXVvwt0LaKU9Ic8mYv7gHkLxd7sXZfpUbxDM06cnzPrfAV5BhNXfW3FnbnWJGdusPRW23qJMU32dS7kVaOuWTQGRZG7ZsDJR6p4gUHpr2XtouJnVCXwk2b7A9wrrLzqp0Tm1u9BdC2jkPQFCLE05XNEn5jk65xH/GiTrFNzwr7jHWZ99ANrNgTcQ29pkrXOQIZtD+cJGeF6fNtNZjy+uopJxmixDvJn4Lt+0fD312n2EC66VLX2GYMq2twC2uRwozPbbv6lujWCDjg8ZBYd3abbGotcx3ZNIxlIpr8DVAm+3WzXRfdakxlvsCwd2RpMpqD6/Xu3Zm41YjebkX9Znp/W4WT539KHuIfQ7Lw7jc7M+EHY8v76qBp3FcbeicZxnrG/8L569tdHa/0ozMhj0qybXIez/c6MJx8q3QZfcynlCaiw8/O54bRFlglotr0Xx/xPecVr/jy6DofSV9FpNvfRYYcg6ecsNtXtr4/ikh3YJL/J3NR6KnpTzsrnq7NGcsmO4silHxXpTnHE83Pem2/EvHl5ZXC9NoLq975CnZkBzzljkbszs/c/gZUe8WynUf4FfsCOE7SZRQekxwNsn3ueJuvRQTWc1lq7W99JOoUm/Uyx683s8Ru/dY+u6L2+G2nI63DmDPUmd3k8V3j2n/zgr5Y8K/PX+/R/gr6PczSWy0X2nPmVD2K8dFNkU0Bj4XgpZcmx787KuXuzNzMgxY/8UHP6WTTpRoFC2YEjp35qOU3dJOUNzzPfYRcmpYX8Jc9GwvHoV+69rHD0k2TH4aeuKzw3fv5JzWnZs5FwvBCMRaef5RLKDbqLtp1MbWPXRzPb38UODI/i2UyUl/5lXk4QVx6cS2stXRSm72Q50XIFq16f3ZvNxR7PSSoWrOARHVba5TknQihO/X42s+/eyEmcvra6fqPi0F+g4cJx8u8rh7optjvWWUHf+jYBnyotBNXmGf5FPKUQcvh95JOMW2k/vp2p8dz5UowFqj/xUxxO0Ut7N2PQjQ2FsfxY48h++Rs8ofTrtnQNEY/bc3XQdTszsz113CTx0jeXVuhXxTY6IS0Rak9x8W3fyhaWUvtzZ5t8FXGc1/ZdtILe8zUuk4L+XwDlnZsVno1QaNTSjjw6H+PQ2xha4LZU2sAdn1iq3VmJFlM/uMDyq59ZOnIKEnTjRGl5JwMuJg+z+U5K6FssWInmriiNjdin6XqglWkxTj3vuMBKnD/1n8jl2JDHNlYUUrEnXyKYD+HDRq7yi677bOlKouv7813Vl6gYi4tP3wEPsdnKtBDcSi2vnyDmaiT/KapHyt1spY5apv9Lv//R7eO8f3Yx2tkKinMsLlRdQVM8LU3FV9MXlH9NtooOxx98E1/+P7uJ/DScvwCWT80axt+DrIxtzEqX/qW/jPI6iRvwIpMt7OfqdXx6cDH9WauQssWMx9Cz/LuXw6z/NbyxRQryipMMQccUgm7sKIRxWH1Q5aWU72H1k0dxxJ+1HLiWO1/+Mt/Jp4bhxUg2+sjl2fBi6PJsbDGWjS9GF8PZyGLkC7Q/9XY+v/1JDrODnewh6RZ97ma4L6WsulmQjlK7ySt9sA13fnzwYPdte0EiJyQRf/75/Zb/b1O4hEWLi86Px+Oyr5/Lh19Rx2PxRZXC0XaPHqSvueyL58Gnn366XmZlOAKtl505/cf0H9N/TP8x/cf0H9N/TP8x/cf0H9N/TP8x/cf0H9N/TP/xTAkoAA==",
  // Add more users and their icons as needed
};

class QuestionAnswering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: localStorage.getItem("input") || "",
      loading: false,
      question: "",
      messages: [],
      newMessage: "",
      currentUser: "user2",
      title: "",
      tid: localStorage.getItem("current_topic"),
      id: localStorage.getItem("isLoggedIn"),
    };
  }

  componentDidMount() {
    if (this.state.tid != null) {
      axios
        .get("http://localhost:8080/jpa/" + this.state.tid + "/get-doubt")
        .then((response) => {
          this.setState({
            messages: response.data,
          });
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }

  handleInputChange = (e) => {
    const inputValue = e.target.value;
    this.setState({
      input: inputValue,
    });
    if (this.state.tid !== null) {
      fetch("http://localhost:8080/jpa/" + this.state.tid + "/edit-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e.target.value),
      }).catch((error) => console.log(error));
      localStorage.setItem("input", inputValue);
    }
  };

  handleQuestionChange = (e) => {
    this.setState({ question: e.target.value });
  };

  handleSubmit = async () => {
    const { input, question } = this.state;

    // Add user2 question and loading message to the messages array
    this.setState((prevState) => ({
      messages: [
        ...prevState.messages,
        { text: question, sender: "user2" },
        { text: "...", sender: "user1", loading: true }, // Placeholder for loading message
      ],
      question: "",
    }));

    // Make a POST request to the API
    try {
      if (this.state.tid === null) {
        await axios
          .post("http://localhost:5000/generate-title", {
            context: input,
          })
          .then((response) => {
            this.setState({
              title: response.data.title,
              loading: false,
            });

            fetch(
              "http://localhost:8080/jpa/" + this.state.id + "/create-topics",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  topic: response.data.title,
                  content: input,
                }),
              }
            )
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                localStorage.setItem("current_topic", data);
                this.setState({
                  tid: data,
                });
                this.setState({
                  loading: false,
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          });
      }

      const response = await fetch("http://localhost:5000/question-answering", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: input, question: question }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the loading message with the actual response data

        await fetch(
          "http://localhost:8080/jpa/" + this.state.tid + "/create-doubt",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: question, sender: "user2" }),
          }
        ).catch((error) => console.log(error));

        await fetch(
          "http://localhost:8080/jpa/" + this.state.tid + "/create-doubt",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: data, sender: "user1" }),
          }
        ).catch((error) => console.log(error));

        this.setState((prevState) => ({
          messages: prevState.messages.map((message) =>
            message.text === "..." && message.sender === "user1"
              ? { ...message, text: data, loading: false } // Update loading flag
              : message
          ),
          question: "",
        }));
        console.log(data);
      } else {
        console.error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(question);
    console.log(this.state.messages);
  };

  render() {
    const { messages, question } = this.state;
    return (
      <>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Row>
                <Col xs={12} className="text-center">
                  <h1>Doubts</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="text-center">
                  <Form>
                    <Form.Control
                      as="textarea"
                      rows={20}
                      placeholder="Place your content"
                      value={this.state.input}
                      onChange={this.handleInputChange}
                    />
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6}>
              <Row className="doubts-chat-box">
                <div className="chat-app">
                  <div className="message-list">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`message ${
                          message.sender === "user1" ? "left" : "right"
                        } ${message.loading ? "loading-animation" : ""}`}
                      >
                        <span className="user-icon">
                          {/* {userIcons[message.sender]} */}
                          <img
                            src={userIcons[message.sender]}
                            alt={`User ${message.sender}`}
                            style={{ width: "30px", borderRadius: "50%" }}
                          />
                        </span>
                        <div className="message-text">{message.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Row>
              <Row className="give-both-margins">
                <Stack direction="horizontal" gap={3}>
                  <Form.Control
                    className="question-field"
                    value={this.state.question}
                    onChange={(e) =>
                      this.setState({ question: e.target.value })
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" ? this.handleSubmit() : ""
                    }
                  />
                  <Button className="send-button" onClick={this.handleSubmit}>
                    <IoIosSend />
                  </Button>
                </Stack>
              </Row>
            </Col>
          </Row>
        </Container>
        <Button
          className="new"
          onClick={() => {
            this.setState({
              messages: [],
              tid: null,
            });
            localStorage.removeItem("current_topic");
            localStorage.removeItem("input");
            window.location.reload();
          }}
        >
          <CgAddR size={40} />
        </Button>
      </>
    );
  }
}

export default QuestionAnswering;
