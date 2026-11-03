"use client";

/**
 * KOMPONEN: ClientsSection
 * ========================
 * Grid logo klien — pure logo, background #f8f8f8, no frame.
 *
 * CARA TAMBAH KLIEN:
 * Edit array `clients` di bawah.
 * { name: "Nama", logo: "/images/clients/file.png" }
 * Kosongkan logo: "" jika belum punya file.
 */

import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  { name: "Grab",                  logo: "/images/clients/grab.png"       },
  { name: "Jenius",                logo: "/images/clients/jenius.png"     },
  { name: "United Tractors",       logo: "/images/clients/UT.png"         },
  { name: "Silueta",               logo: "/images/clients/silueta.png"    },
  { name: "Sriboga",               logo: "/images/clients/sriboga.png"    },
  { name: "Pertamina",             logo: "/images/clients/pertamina.png"  },
  { name: "UNDIP",                 logo: "/images/clients/undip.png"      },
  { name: "Unisbank",              logo: "/images/clients/UNISBANK.png"   },
  { name: "Kemayu",                logo: "/images/clients/kemayu.jpg"     },
  { name: "UNW",                   logo: "/images/clients/UNW.png"        },
  { name: "PwC Indonesia",         logo: "/images/clients/PWC.png"        },
  { name: "MilkLife",              logo: "/images/clients/milklife.png"   },
  { name: "Paiton",                logo: "/images/clients/paiton.png"     },
  { name: "Nestlé",                logo: "/images/clients/nestle.png"     },
  { name: "MAS Indonesia",         logo: "/images/clients/nestle.png"                               },
  { name: "Kementrian Perhutanan", logo: "/images/clients/kemenhut.png"                               },
  { name: "Bank Raya",             logo: "/images/clients/bankraya.png"   },
  { name: "Samsat Digital",        logo: "/images/clients/samsat.png"     },
  { name: "Kombucha by Savva",     logo: "/images/clients/savva.png"                               },
  { name: "Peacock Coffee",        logo: "/images/clients/peacock.png"    },
  { name: "Antarakata",            logo: "/images/clients/antarakata.jpg" },
  { name: "Pisyang Shayang",       logo: "/images/clients/ps.jpg"         },
  { name: "Pizza Station",         logo: "/images/clients/pizza.png"      },
];

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function ClientsSection() {
  return (
    <section
      id="clients"
      style={{ background: "#f8f8f8", borderTop: "1px solid #e8e8e8", padding: "96px 0" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#aaa", marginBottom: "12px",
            }}
          >
            Trusted By
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.03em" }}
          >
            Our Clients
          </motion.h2>
        </div>

        {/* Grid — inline style supaya tidak ada konflik Tailwind */}
        <div
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            gap:            "28px 20px",
            alignItems:     "center",
            justifyContent: "center",
            maxWidth:       "1080px",
            margin:         "0 auto",
          }}
        >
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
              transition={{ delay: i * 0.025, duration: 0.45, ease: "easeOut" }}
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          "100%",
                maxWidth:       "160px",
                minHeight:      "72px",
                opacity:        1,
                cursor:         "default",
                padding:        "8px 6px",
                transformOrigin: "center",
              }}
            >
              {/* Logo */}
              <div
                style={{
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "140px",
                  margin: "0 auto",
                }}
              >
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={180}
                    height={64}
                    unoptimized
                    style={{
                      display:      "block",
                      objectFit:    "contain",
                      height:       "54px",
                      width:        "100%",
                      maxWidth:     "128px",
                      mixBlendMode: "multiply",  // hilangkan bg putih
                    }}
                  />
                ) : (
                  <span style={{ fontWeight: 800, fontSize: "13px", letterSpacing: "0.18em", color: "#bbb" }}>
                    {getInitials(c.name)}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p style={{ fontSize: "11px", color: "#ccc", marginTop: "48px" }}>
          {clients.length} brands & counting
        </p>

      </div>
    </section>
  );
}
