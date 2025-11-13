# Instrucciones para subir el código a GitHub

Sigue estos pasos para agregar el código al repositorio de GitHub:

## 1. Navegar al directorio del proyecto

```bash
cd agroplanet
```

## 2. Inicializar Git (si no está inicializado)

```bash
git init
```

## 3. Agregar el remote de GitHub

```bash
git remote add origin https://github.com/dyvargasra-lang/AgroPlanet.git
```

Si el remote ya existe, puedes actualizarlo con:
```bash
git remote set-url origin https://github.com/dyvargasra-lang/AgroPlanet.git
```

## 4. Agregar todos los archivos

```bash
git add .
```

## 5. Hacer commit

```bash
git commit -m "Initial commit: Monorepo completo con frontend React, backend Express y PostgreSQL"
```

## 6. Configurar la rama principal (si es necesario)

```bash
git branch -M main
```

## 7. Hacer push al repositorio

```bash
git push -u origin main
```

Si el repositorio ya tiene contenido y quieres forzar el push (¡cuidado!):
```bash
git push -u origin main --force
```

## Notas importantes

- Asegúrate de tener configurado Git con tu usuario:
  ```bash
  git config --global user.name "Tu Nombre"
  git config --global user.email "tu.email@example.com"
  ```

- Si el repositorio ya tiene commits, puedes hacer un pull primero:
  ```bash
  git pull origin main --allow-unrelated-histories
  ```

- Los archivos `.env` y `node_modules` están en `.gitignore` y no se subirán (esto es correcto).

## Verificar el estado

Para verificar que todo está correcto:
```bash
git status
git remote -v
```

