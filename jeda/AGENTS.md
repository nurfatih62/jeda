Terapkan Domain-Driven Design (DDD)

Pisahkan struktur folder berdasarkan domain/bounded context (misal: auth, article, user-profile, notification, report, author-dashboard, admin), bukan berdasarkan tipe file.
Setiap domain punya layer sendiri (entity/model, use case/service, repository/data source, presentation/UI) sesuai konvensi DDD di frontend.