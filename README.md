# 🏥 კლინიკაპრო - სამედიცინო კლინიკის მართვის სისტემა

## 📋 პროექტის აღწერა

**კლინიკაპრო** არის თანამედროვე, ინტუიციური და ფუნქციური ვებ-აპლიკაცია სამედიცინო კლინიკების მართვისთვი
. ეს სისტემა დაგეხმარებათ ექიმების, ვიზიტების და პაციენტების ეფექტურად მართვაში.

## ✨ ძირითადი ფუნქციები

### 👨‍⚕️ ექიმების მართვა

- ახალი ექიმების დამატება
- ექიმების ინფორმაციის რედაქტირება
- 15+ სამ
  დიცინო სპეციალობა
- ხელმისaწვდომობის სტატუსის მართვა
- კონტაქტური ინფორმაციის შენახვა

### 📅 ვიზიტების სისტემა

- ვიზიტების ჯავშნა
- ვიზიტების სტატუსის მართვა (დაგეგმილი, მიმდინარე, დასრულებული, გაუქმებული)
- ფილტრაცია თარიღის, ექიმის და პაციენტის მიხედვით
- ავტომატური დრო-თარიღის ვალიდაცია

### 📊 ანალიტიკა და რე

ორტები

- სტატისტიკური ინფორმაცია
- ექიმების ხელმისaწვდომობის ანალიზი
- ვიზიტების რაოდენობრივი მაჩვენებლები
- ბოლო ვიზიტების მონიტორინგი

### 📱 რესპონსული დიზაინი

- მობილური მოწყობილობების მხარდაჭერა
- ტაბლეტებისთვის ოპტიმიზაცია
- თანამედროვე და მოსახერხებელი ინტერფეისი

## 🛠️ ტექნოლოგიები

- **Frontend**: React 18
- **Routing**: React Router 6
- **Form Management**: React Hook Form
- **Styling**: TailwindCSS
- **State Management**: localStorage
- **I
  ons**: Heroicons
- **Fonts**: Noto Sans Georgian

## 🚀 პროექტის გაშვება

### წინაპირობები

```bash
Node.js (v14 ან უფრო მაღალი ვერსია)
npm ან yarn
```

### ინსტალაცია

1. **რეპოზიტორის კლონირება**

```bash
git clone <repository-url>
cd qeto-project
```

2. **დამოკიდებულებებების ინსტალაცია**

```bash
npm install
```

3. **დეველოპმენტ სერვერის გაშვება**

```bash
npm start
```

4. **ბრაუზერში გახსნა**

```
http://localhost:3000
```

## 📦 Build და Deploy

### Production Build

```bash
npm run build
```

### პროექტის ტესტირება

```bash
npm test
```

## 📁 პროექტის სტრუქტურა

```
qeto-project/
├── public/
│   ├── index.html          # მთავარი HTML ფაილი
│   ├── manifest.json       # PW
 manifest
│   └── favicon.ico         # ფავიკონი
├── src/
│   ├── components/         # კომპონენტები
│   │   ├── AppointmentCard.js
│   │   ├── AppointmentForm.js
│   │   ├── DoctorCard.js
│   │   ├── DoctorForm.js
│   │   ├── Layout.js
│   │   ├── Navbar.js
│   │   └── Sidebar.js
│   ├── pages/              # გვერდები
│   │   ├── AddDoctor.js
│   │   ├── Appointments.js
│   │   ├── BookAppointment.js
│   │   ├── Dashboard.js
│   │   └── DoctorsList.js
│   ├── utils/              # დამხმარე ფუნქციები
│   │   └── localStorage.js
│   ├── App.js              # მთავარი კომპონენტი
│   ├── index.js            # entry point
│   └── index.css           # სტილები
├── package.json            # პროექტის კონფიგურაცია
├── tailwind.config.js      # TailwindCSS კონფიგურაცია
└── README.md              # ამ ფაილი
```

## 🎨 კასტომიზაცია

### ფერების თემა

პროექტში გამოიყენება მწვანე სამედიცინო თემა. ფერების შეცვლისთვის რედაქტირება `tailwind.config.js` ფაილში:

```javascript
colors: {
  primary: {
    50: '#f0fdf4',   // ღია მწვანე
    500: '#22c55e',  // ძირითადი მწვანე
    600: '#
6a34a',  // მუქი მწვანე
    // ...
  }
}
```

### ენის დამატება

ახალი ე
ის დამატებისთვის:

1. შექმენით ენის ფაილები `src/locales/` დირექტორიაში
2. დაამატეთ i18n კონფიგურაცია
3. ყველა კომპონენტში ტექსტის ჩანაცვლება

## 📱 PWA მხარდაჭერა

აპლიკაცია მხარს უჭერს P
ogressive Web App (PWA) ფუნქციონალს:

- ოფლაინ მუშაობა
- მობილურ მოწყობილობაზე ინსტალაცია
- Push ნოტიფიკაციები (მომავალში)

## 🔧 კონფიგურაცია

### ლოკალური მონაცემე

ი

პროექტი იყენებს `localStorage`-ს მონაცემების შესანახად. Production-ში შეგიძლიათ ჩაანაცვლოთ:

- REST API
- GraphQL
- Firebase
- MongoDB

## ვალიდაცია

ფორმების ვალიდაცია ხორციელდება React Hook Form-ით. ქართული ერორების მესიჯები განსაზღვრულია ყველა კომპონენტში.

## 🐛 პრობლემების მოგვარება

### სტანდარტული პრობლემები

1. **პორტის კონფლიქტი**

```bash
# სხვა პორტის გამოყენება
PORT=3001 npm start
```

2.  \*Node modules პრობლემები\*\*

```bash
rm -rf node_modules package-lock.json
npm install
```

3. **კეშის გასუფთავება**

```bash
npm start -- --reset-cache
```

## 🤝 წვლილის შეტანა

პროექტში წვლილის შეტა
ა:

1. Fork repository
2. შექმენით ახალი branch (`git checkout -b feature/AmazingFeature`)
3. Commit ცვლილებები
   `git commit -m 'Add some AmazingFeature'`)
4. Push branch-ზე (`git push origin feature/AmazingFeature`)
5. შექმენით Pull Request

## 📄 ლ

ცენზია

ეს პროექტი ვრცელდება MIT ლიცენზიით. იხილეთ `LICENSE` ფაილი დეტალებისთვის.

## 👥 ავტორები

- **თქვენი სახელი** - _Initial work_ - [GitHub](https://github.com/username)

#

🙏 მადლობა

- React.js Team
- TailwindCSS Team
- Google Fonts (Noto Sans Georgian)
- Heroicons
- React Hook Form

## 📞 კონტაქტი

პროექტთან დაკავშირებული შეკითხვებისთვის:

- Email: info@clinicpro.ge
- Website: https://clinicpro.ge

---

**შექმნილია ❤️ Georgian Developers-ის მიერ**
