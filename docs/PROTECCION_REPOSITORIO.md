# Protección del Repositorio - Configuración de Solo Lectura

Este documento explica cómo configurar el repositorio para que sea de solo lectura y requiera autorización para hacer commits.

## Opción 1: Branch Protection Rules (Recomendado)

Esta opción permite que solo ciertos usuarios o mediante Pull Requests se puedan hacer cambios.

### Pasos:

1. **Ir a la configuración del repositorio:**
   - Navega a: https://github.com/dyvargasra-lang/AgroPlanet
   - Haz clic en **Settings** (Configuración)

2. **Configurar Branch Protection:**
   - En el menú lateral, haz clic en **Branches**
   - En "Branch protection rules", haz clic en **Add rule** (o edita la regla existente para `main`)

3. **Configurar las reglas:**
   - **Branch name pattern**: `main` (o `*` para todas las ramas)
   
   - Activa las siguientes opciones:
     - ✅ **Require a pull request before merging**
       - ✅ Require approvals: `1` (o el número que desees)
       - ✅ Dismiss stale pull request approvals when new commits are pushed
     
     - ✅ **Require status checks to pass before merging** (opcional, si tienes CI/CD)
     
     - ✅ **Require conversation resolution before merging**
     
     - ✅ **Require signed commits** (opcional, para mayor seguridad)
     
     - ✅ **Require linear history** (opcional)
     
     - ✅ **Do not allow bypassing the above settings**
       - Esto previene que incluso los administradores hagan push directo
     
     - ✅ **Restrict who can push to matching branches**
       - Selecciona los usuarios/equipos que pueden hacer push directamente
       - O déjalo vacío para requerir PR para todos

4. **Guardar los cambios:**
   - Haz clic en **Create** o **Save changes**

### Resultado:
- Los commits directos a `main` estarán bloqueados
- Solo se podrán hacer cambios mediante Pull Requests
- Los PRs requerirán aprobación antes de mergear

## Opción 2: Archivar el Repositorio (Solo Lectura Total)

Esta opción hace el repositorio completamente de solo lectura.

### Pasos:

1. **Ir a la configuración:**
   - Navega a: https://github.com/dyvargasra-lang/AgroPlanet/settings

2. **Archivar el repositorio:**
   - Desplázate hasta la sección **Danger Zone**
   - Haz clic en **Archive this repository**
   - Escribe el nombre del repositorio para confirmar
   - Haz clic en **I understand the consequences, archive this repository**

### Resultado:
- El repositorio quedará completamente archivado
- No se podrán hacer commits, crear issues, ni pull requests
- Solo lectura total

### Para desarchivar:
- Ve a Settings → Danger Zone → Unarchive this repository

## Opción 3: Cambiar Permisos de Colaboradores

Puedes controlar quién puede hacer push directamente.

### Pasos:

1. **Ir a la configuración:**
   - Navega a: https://github.com/dyvargasra-lang/AgroPlanet/settings

2. **Gestionar acceso:**
   - Haz clic en **Collaborators and teams** (o **Manage access`)
   - Para cada colaborador, puedes cambiar los permisos:
     - **Read**: Solo lectura
     - **Triage**: Puede gestionar issues y PRs pero no hacer push
     - **Write**: Puede hacer push (no recomendado si quieres solo lectura)
     - **Maintain**: Puede gestionar el repositorio
     - **Admin**: Acceso completo

## Recomendación

**Usa la Opción 1 (Branch Protection Rules)** porque:
- ✅ Permite colaboración controlada mediante Pull Requests
- ✅ Mantiene el historial y permite revisión de código
- ✅ No bloquea completamente el repositorio
- ✅ Permite que los administradores puedan hacer cambios cuando sea necesario (si no activas "Do not allow bypassing")

## Verificar la Configuración

Después de configurar, intenta hacer un push directo:

```bash
# Esto debería fallar si la protección está activa
git push origin main
```

Deberías ver un error indicando que los push directos no están permitidos.

## Notas Importantes

- Las Branch Protection Rules solo afectan a las ramas especificadas
- Los administradores pueden hacer bypass a menos que actives "Do not allow bypassing"
- Los Pull Requests seguirán funcionando normalmente
- Puedes crear ramas nuevas sin restricciones (a menos que configures reglas para todas las ramas)


