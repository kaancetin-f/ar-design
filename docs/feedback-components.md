# Geri Bildirim Bileşenleri

AR Design kütüphanesindeki geri bildirim bileşenleri, kullanıcıya bilgi vermek ve etkileşim sağlamak için tasarlanmıştır.

## Alert (Uyarı)

```tsx
import { Alert } from 'ar-design';

<Alert status="success" title="Başarılı!">
  İşlem başarıyla tamamlandı.
</Alert>

<Alert status="warning" title="Uyarı!">
  Bu işlem geri alınamaz.
</Alert>

<Alert status="danger" title="Hata!">
  Bir hata oluştu.
</Alert>

<Alert status="information" title="Bilgi">
  Bu bir bilgilendirme mesajıdır.
</Alert>
```

## Modal (Modal Pencere)

```tsx
import { Modal } from 'ar-design';

const [isOpen, setIsOpen] = useState(false);

<Modal 
  open={{ get: isOpen, set: setIsOpen }}
  title="Modal Başlığı"
  footer={<Button onClick={() => setIsOpen(false)}>Kapat</Button>}
>
  <p>Modal içeriği buraya gelecek.</p>
</Modal>
```

## Drawer (Çekmece)

```tsx
import { Drawer } from 'ar-design';

const [isOpen, setIsOpen] = useState(false);

<Drawer 
  open={{ get: isOpen, set: setIsOpen }}
  title="Çekmece Başlığı"
>
  <p>Çekmece içeriği</p>
</Drawer>
```

## Popover (Açılır İpucu)

```tsx
import { Popover } from 'ar-design';

<Popover content="Bu bir ipucu metnidir.">
  <Button>Hover et</Button>
</Popover>
```

## Tooltip (İpucu Balonu)

```tsx
import { Tooltip } from 'ar-design';

<Tooltip title="Bu bir tooltip">
  <Button>Hover et</Button>
</Tooltip>
```

## Progress (İlerleme Çubuğu)

```tsx
import { Progress } from 'ar-design';

<Progress percent={75} />
<Progress percent={50} status="success" />
<Progress percent={25} status="warning" />
<Progress percent={10} status="danger" />
```

## Loading (Yükleme)

```tsx
import { Loading } from 'ar-design';

<Loading />
<Loading size="large" />
```

## Notification (Bildirim)

```tsx
import { Notification } from 'ar-design';

<Notification 
  title="Bildirim"
  message="Bu bir bildirim mesajıdır."
  status="success"
/>
```

## Popup (Açılır Pencere)

```tsx
import { Popup } from 'ar-design';

<Popup 
  trigger={<Button>Aç</Button>}
  content={<div>Popup içeriği</div>}
/>
``` 