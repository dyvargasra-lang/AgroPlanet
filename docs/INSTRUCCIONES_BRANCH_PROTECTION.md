# Instrucciones Paso a Paso: Configurar Branch Protection

## Paso 1: Navegar a la Configuración de Branches

1. Ve a tu repositorio: https://github.com/dyvargasra-lang/AgroPlanet
2. Haz clic en **Settings** (Configuración) - está en la parte superior del repositorio
3. En el menú lateral izquierdo, busca la sección **"Code and automation"**
4. Haz clic en **"Branches"**

## Paso 2: Crear o Editar la Regla de Protección

1. En la página de Branches, verás una sección llamada **"Branch protection rules"**
2. Si ya existe una regla para `main`, haz clic en **"Edit"** (Editar)
3. Si no existe ninguna regla, haz clic en **"Add rule"** (Agregar regla)

## Paso 3: Configurar la Regla

### Nombre de la Rama
- En el campo **"Branch name pattern"**, escribe: `main`
- O usa `*` si quieres proteger todas las ramas

### Opciones a Activar (marca estas casillas):

✅ **Require a pull request before merging**
   - Esto bloquea los commits directos
   - Opcionalmente activa:
     - ✅ **Require approvals**: Pon `1` (o el número que desees)
     - ✅ **Dismiss stale pull request approvals when new commits are pushed**

✅ **Do not allow bypassing the above settings**
   - Esto previene que incluso los administradores hagan push directo
   - **IMPORTANTE**: Si activas esto, ni tú podrás hacer push directo sin PR

### Opciones Adicionales (opcionales):

- ✅ **Require conversation resolution before merging**
- ✅ **Require signed commits** (para mayor seguridad)
- ✅ **Require linear history**
- ✅ **Restrict who can push to matching branches** (puedes dejar vacío para requerir PR para todos)

## Paso 4: Guardar

1. Desplázate hacia abajo
2. Haz clic en **"Create"** (si es nueva regla) o **"Save changes"** (si estás editando)

## Verificar que Funciona

Después de guardar, intenta hacer un push directo desde tu terminal:

```bash
# Esto debería fallar si la protección está activa
git push origin main
```

Deberías ver un error como:
```
! [remote rejected] main -> main (protected branch hook declined)
```

## Notas Importantes

- Si activaste "Do not allow bypassing", incluso los administradores necesitarán crear PRs
- Los Pull Requests seguirán funcionando normalmente
- Puedes crear nuevas ramas sin restricciones (a menos que uses `*` en el patrón)
- Para hacer cambios urgentes, puedes desactivar temporalmente la regla o crear una rama y luego un PR

## Desactivar la Protección (si es necesario)

1. Ve a Settings → Branches
2. Haz clic en "Edit" en la regla de `main`
3. Desmarca las opciones o haz clic en "Delete" para eliminar la regla completamente


